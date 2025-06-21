
import React, { useState } from 'react';
import { Building2, Calendar, FileText, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InterviewSchedule from '@/components/InterviewSchedule';
import EvaluationRubric from '@/components/EvaluationRubric';
import TopContenders from '@/components/TopContenders';

interface Candidate {
  id: string;
  name: string;
  role: string;
  date: string;
  time: string;
  interviewers: string;
  format: 'In-Person' | 'Virtual';
}

interface CandidateEvaluation {
  candidateId: string;
  overallScore: number;
  ratings: {[key: string]: number};
  comments: {[key: string]: string};
  finalRecommendation: string;
  evaluatedAt: string;
}

const Index = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      role: 'Clinical Research Coordinator',
      date: '2025-01-27',
      time: '09:00',
      interviewers: 'Dr. Martinez, Ms. Johnson',
      format: 'In-Person'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      role: 'Oncology Nurse',
      date: '2025-01-27',
      time: '11:00',
      interviewers: 'Director Thompson, CNO Davis',
      format: 'Virtual'
    },
    {
      id: '3',
      name: 'Dr. Amanda Foster',
      role: 'Medical Oncologist',
      date: '2025-01-28',
      time: '14:00',
      interviewers: 'Chief Medical Officer, Dr. Williams',
      format: 'In-Person'
    },
    {
      id: '4',
      name: 'James Park',
      role: 'Clinical Data Manager',
      date: '2025-01-29',
      time: '10:30',
      interviewers: 'IT Director, Quality Manager',
      format: 'Virtual'
    },
    {
      id: '5',
      name: 'Dr. Lisa Wong',
      role: 'Radiation Oncologist',
      date: '2025-01-30',
      time: '13:00',
      interviewers: 'Department Head, Dr. Kumar',
      format: 'In-Person'
    }
  ]);

  const [evaluations, setEvaluations] = useState<CandidateEvaluation[]>([]);

  const calculateOverallScore = (ratings: {[key: string]: number}) => {
    const weights = { 
      "Technical Expertise": 0.25, 
      "Communication Skills": 0.20, 
      "Cultural Fit": 0.20, 
      "Problem-Solving": 0.20, 
      "Professionalism": 0.15 
    };
    let totalScore = 0;
    let totalWeight = 0;
    
    Object.entries(ratings).forEach(([category, rating]) => {
      if (weights[category as keyof typeof weights]) {
        totalScore += rating * weights[category as keyof typeof weights];
        totalWeight += weights[category as keyof typeof weights];
      }
    });
    
    return totalWeight > 0 ? parseFloat((totalScore / totalWeight).toFixed(1)) : 0;
  };

  const handleSaveEvaluation = (candidateId: string, ratings: {[key: string]: number}, comments: {[key: string]: string}, finalRecommendation: string) => {
    const overallScore = calculateOverallScore(ratings);
    const newEvaluation: CandidateEvaluation = {
      candidateId,
      overallScore,
      ratings,
      comments,
      finalRecommendation,
      evaluatedAt: new Date().toISOString()
    };

    setEvaluations(prev => {
      const filtered = prev.filter(e => e.candidateId !== candidateId);
      return [...filtered, newEvaluation];
    });
  };

  const evaluatedCount = evaluations.length;
  const averageScore = evaluations.length > 0 
    ? (evaluations.reduce((sum, evaluation) => sum + evaluation.overallScore, 0) / evaluations.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Healthcare-themed background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border border-blue-300 rounded-full"></div>
        <div className="absolute top-32 right-20 w-32 h-32 border border-green-300 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 border border-blue-200 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-green-200 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-100 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-10 w-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">Icon Oncology</h1>
          </div>
          <p className="text-xl text-blue-100 mb-2">Recruitment Management System</p>
          <p className="text-sm text-slate-300">Professional interview scheduling and candidate evaluation tools</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-400 bg-slate-800/80 border-slate-700 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">This Week</p>
                  <p className="text-3xl font-bold text-white">{candidates.length}</p>
                  <p className="text-sm text-slate-400">Scheduled Interviews</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-400 bg-slate-800/80 border-slate-700 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Evaluated</p>
                  <p className="text-3xl font-bold text-white">{evaluatedCount}</p>
                  <p className="text-sm text-slate-400">Candidates</p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-400 bg-slate-800/80 border-slate-700 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Avg. Score</p>
                  <p className="text-3xl font-bold text-white">{averageScore}</p>
                  <p className="text-sm text-slate-400">Candidate Rating</p>
                </div>
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-400 bg-slate-800/80 border-slate-700 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">Top Score</p>
                  <p className="text-3xl font-bold text-white">{evaluations.length > 0 ? Math.max(...evaluations.map(e => e.overallScore)).toFixed(1) : '0.0'}</p>
                  <p className="text-sm text-slate-400">Best Rating</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-800/80 border-slate-700">
            <TabsTrigger value="schedule" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">
              <Calendar className="h-4 w-4" />
              Interview Schedule
            </TabsTrigger>
            <TabsTrigger value="rubric" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">
              <FileText className="h-4 w-4" />
              Evaluation Rubric
            </TabsTrigger>
            <TabsTrigger value="contenders" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">
              <Trophy className="h-4 w-4" />
              Top Contenders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <InterviewSchedule candidates={candidates} setCandidates={setCandidates} />
          </TabsContent>

          <TabsContent value="rubric" className="space-y-4">
            <EvaluationRubric candidates={candidates} onSaveEvaluation={handleSaveEvaluation} />
          </TabsContent>

          <TabsContent value="contenders" className="space-y-4">
            <TopContenders candidates={candidates} evaluations={evaluations} />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-700">
          <p className="text-sm text-slate-400">
            © 2025 Icon Oncology - Recruitment Department | Professional Healthcare Staffing Solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
