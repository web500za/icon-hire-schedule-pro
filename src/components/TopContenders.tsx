
import React from 'react';
import { Trophy, Star, Calendar, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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

interface TopContendersProps {
  candidates: Candidate[];
  evaluations: CandidateEvaluation[];
}

const TopContenders = ({ candidates, evaluations }: TopContendersProps) => {
  // Get candidates with evaluations and sort by score
  const evaluatedCandidates = evaluations
    .map(evaluation => {
      const candidate = candidates.find(c => c.id === evaluation.candidateId);
      return candidate ? { ...candidate, evaluation } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b!.evaluation.overallScore - a!.evaluation.overallScore)
    .slice(0, 5); // Top 5 candidates

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-400';
    if (score >= 4.0) return 'text-blue-400';
    if (score >= 3.5) return 'text-yellow-400';
    return 'text-slate-400';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 4.5) return 'bg-green-600/20 text-green-400 border-green-600';
    if (score >= 4.0) return 'bg-blue-600/20 text-blue-400 border-blue-600';
    if (score >= 3.5) return 'bg-yellow-600/20 text-yellow-400 border-yellow-600';
    return 'bg-slate-600/20 text-slate-400 border-slate-600';
  };

  return (
    <Card className="w-full bg-slate-800/80 border-slate-700 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-700 bg-slate-900/50">
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-400" />
          Top Contenders
        </CardTitle>
        <p className="text-slate-300 mt-1">Highest-rated candidates based on evaluation scores</p>
      </CardHeader>
      
      <CardContent className="p-6 bg-slate-800/50">
        {evaluatedCandidates.length === 0 ? (
          <div className="text-center py-8">
            <Star className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No evaluated candidates yet</p>
            <p className="text-slate-500 text-sm mt-2">Complete candidate evaluations to see top contenders here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {evaluatedCandidates.map((candidate, index) => (
              <div key={candidate!.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600 text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{candidate!.name}</h3>
                      <p className="text-slate-300 text-sm">{candidate!.role}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-sm font-semibold ${getScoreBadge(candidate!.evaluation.overallScore)}`}>
                    {candidate!.evaluation.overallScore.toFixed(1)}/5.0
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="h-4 w-4" />
                    <span>Interviewed: {new Date(candidate!.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <User className="h-4 w-4" />
                    <span>{candidate!.interviewers}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className={`w-2 h-2 rounded-full ${candidate!.format === 'Virtual' ? 'bg-green-400' : 'bg-blue-400'}`}></span>
                    <span>{candidate!.format}</span>
                  </div>
                </div>

                {candidate!.evaluation.finalRecommendation && (
                  <div className="mt-3 p-3 bg-slate-600/30 rounded border-l-4 border-blue-500">
                    <p className="text-slate-300 text-sm italic">"{candidate!.evaluation.finalRecommendation}"</p>
                  </div>
                )}

                <div className="flex gap-2 mt-3 text-xs">
                  {Object.entries(candidate!.evaluation.ratings).map(([category, rating]) => (
                    <span key={category} className="px-2 py-1 bg-slate-600 rounded text-slate-300">
                      {category.split(' ')[0]}: {rating}/5
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopContenders;
