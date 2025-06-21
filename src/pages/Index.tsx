
import React, { useState } from 'react';
import { Building2, Calendar, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InterviewSchedule from '@/components/InterviewSchedule';
import EvaluationRubric from '@/components/EvaluationRubric';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-800">Icon Oncology</h1>
          </div>
          <p className="text-xl text-slate-600 mb-2">Recruitment Management System</p>
          <p className="text-sm text-slate-500">Professional interview scheduling and candidate evaluation tools</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">This Week</p>
                  <p className="text-3xl font-bold text-slate-800">5</p>
                  <p className="text-sm text-slate-500">Scheduled Interviews</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Open Positions</p>
                  <p className="text-3xl font-bold text-slate-800">8</p>
                  <p className="text-sm text-slate-500">Across Departments</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Avg. Score</p>
                  <p className="text-3xl font-bold text-slate-800">4.2</p>
                  <p className="text-sm text-slate-500">Candidate Rating</p>
                </div>
                <FileText className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Interview Schedule
            </TabsTrigger>
            <TabsTrigger value="rubric" className="flex items-center gap-2">
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
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            © 2025 Icon Oncology - Recruitment Department | Professional Healthcare Staffing Solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
