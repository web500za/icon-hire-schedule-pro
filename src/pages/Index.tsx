
import React, { useState } from 'react';
import { Building2, Calendar, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InterviewSchedule from '@/components/InterviewSchedule';
import EvaluationRubric from '@/components/EvaluationRubric';

const Index = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-400 bg-slate-800/80 border-slate-700 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">This Week</p>
                  <p className="text-3xl font-bold text-white">5</p>
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
                  <p className="text-sm font-medium text-slate-300">Open Positions</p>
                  <p className="text-3xl font-bold text-white">8</p>
                  <p className="text-sm text-slate-400">Across Departments</p>
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
                  <p className="text-3xl font-bold text-white">4.2</p>
                  <p className="text-sm text-slate-400">Candidate Rating</p>
                </div>
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-800/80 border-slate-700">
            <TabsTrigger value="schedule" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">
              <Calendar className="h-4 w-4" />
              Interview Schedule
            </TabsTrigger>
            <TabsTrigger value="rubric" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300">
              <FileText className="h-4 w-4" />
              Evaluation Rubric
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <InterviewSchedule />
          </TabsContent>

          <TabsContent value="rubric" className="space-y-4">
            <EvaluationRubric />
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
