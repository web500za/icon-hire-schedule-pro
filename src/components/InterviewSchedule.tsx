import React, { useState } from 'react';
import { Calendar, Clock, Users, Video, MapPin, Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const InterviewSchedule = () => {
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

  const addCandidate = () => {
    const newCandidate: Candidate = {
      id: Date.now().toString(),
      name: 'New Candidate',
      role: 'Position TBD',
      date: new Date().toISOString().split('T')[0],
      time: '09:00',
      interviewers: 'TBD',
      format: 'Virtual'
    };
    setCandidates([...candidates, newCandidate]);
  };

  const updateCandidate = (id: string, field: keyof Candidate, value: string) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === id ? { ...candidate, [field]: value } : candidate
    ));
  };

  const exportToCSV = () => {
    const headers = ['Candidate Name', 'Role Applied For', 'Date', 'Time', 'Interviewer(s)', 'Interview Format'];
    const csvContent = [
      headers.join(','),
      ...candidates.map(candidate => [
        candidate.name,
        candidate.role,
        candidate.date,
        candidate.time,
        candidate.interviewers,
        candidate.format
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'icon-oncology-interview-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full bg-slate-800/80 border-slate-700 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-700 bg-slate-900/50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="h-6 w-6 text-blue-400" />
              Weekly Interview Schedule
            </CardTitle>
            <p className="text-slate-300 mt-1">Icon Oncology - Recruitment Department</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={addCandidate} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Candidate
            </Button>
            <Button onClick={exportToCSV} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50 border-b border-slate-700">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-200">Candidate Name</th>
                <th className="text-left p-4 font-semibold text-slate-200">Role Applied For</th>
                <th className="text-left p-4 font-semibold text-slate-200">Date & Time</th>
                <th className="text-left p-4 font-semibold text-slate-200">Interviewer(s)</th>
                <th className="text-left p-4 font-semibold text-slate-200">Interview Format</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={candidate.id} className={`border-b border-slate-700 hover:bg-slate-700/50 ${index % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-800/50'}`}>
                  <td className="p-4">
                    <input
                      type="text"
                      value={candidate.name}
                      onChange={(e) => updateCandidate(candidate.id, 'name', e.target.value)}
                      className="w-full border-none bg-transparent font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-700/50 rounded px-2 py-1"
                    />
                  </td>
                  <td className="p-4">
                    <input
                      type="text"
                      value={candidate.role}
                      onChange={(e) => updateCandidate(candidate.id, 'role', e.target.value)}
                      className="w-full border-none bg-transparent text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-700/50 rounded px-2 py-1"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <input
                        type="date"
                        value={candidate.date}
                        onChange={(e) => updateCandidate(candidate.id, 'date', e.target.value)}
                        className="border-none bg-transparent text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-700/50 rounded px-2 py-1"
                      />
                      <Clock className="h-4 w-4 text-slate-400 ml-2" />
                      <input
                        type="time"
                        value={candidate.time}
                        onChange={(e) => updateCandidate(candidate.id, 'time', e.target.value)}
                        className="border-none bg-transparent text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-700/50 rounded px-2 py-1"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={candidate.interviewers}
                        onChange={(e) => updateCandidate(candidate.id, 'interviewers', e.target.value)}
                        className="w-full border-none bg-transparent text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-700/50 rounded px-2 py-1"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {candidate.format === 'Virtual' ? 
                        <Video className="h-4 w-4 text-green-400" /> : 
                        <MapPin className="h-4 w-4 text-blue-400" />
                      }
                      <select
                        value={candidate.format}
                        onChange={(e) => updateCandidate(candidate.id, 'format', e.target.value)}
                        className="border-none bg-transparent text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-700/50 rounded px-2 py-1"
                      >
                        <option value="Virtual" className="bg-slate-800 text-slate-200">Virtual</option>
                        <option value="In-Person" className="bg-slate-800 text-slate-200">In-Person</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewSchedule;
