import { useFetch } from "@/hooks"
import { Assignment, GroupedSubmissions, PaletteAPIResponse, Submission } from "palette-types"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function AssignmentDashboard (){

    const {courseId, assignmentId} = useParams()
    const { fetchData: fetchAssignment } = useFetch(`/courses/${courseId}/assignments/${assignmentId}`);
    const { fetchData: fetchSubmissions } = useFetch(`/courses/${courseId}/assignments/${assignmentId}/submissions`);
    interface GroupedSubmissions {
    [groupName: string]: Submission[];
  }
    const [assignment, setAssignment] = useState<any>({});
    const [submissions, setSubmissions] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
     const fetchAll = async () => {
       setLoading(true);
       setError(null);
       try {
         const assignmentRes = await fetchAssignment() as PaletteAPIResponse<Assignment>
         setAssignment(assignmentRes.data);

         const submissionsRes = await fetchSubmissions() as PaletteAPIResponse<GroupedSubmissions>
         const submissionData = submissionsRes.data
         const flatSubmissions = Object.values(submissionData ?? {}).flat()
         
         setSubmissions(flatSubmissions);
         console.log(submissions)
       } catch (err: any) {
         setError(err.message || "Failed to fetch data");
       } finally {
         setLoading(false);
       }
     };

     fetchAll();
   }, [courseId, assignmentId]);

   useEffect (() => {console.log(submissions)}, [submissions])
    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            {assignment?.name || 'Assignment'}
                        </h1>
                        <p className="text-slate-600 mt-1">
                            Due {assignment?.dueDate ? new Date(assignment?.dueDate).toLocaleDateString() : 'No due date'} • {assignment?.pointsPossible || 0} points
                        </p>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <button className="p-3 bg-white/60 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/80 transition-all shadow-lg">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </button>
                <button className="p-3 bg-white/60 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/80 transition-all shadow-lg">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                </button>
            </div>
            </div>

            {/* Assignment Info Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 mb-6">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Assignment Details</h3>
                {assignment?.description && (
                    <div className="text-slate-700 mb-4" dangerouslySetInnerHTML={{ __html: assignment?.description }} />
                )}
                <div className="flex items-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Created {assignment?.createdAt ? new Date(assignment?.createdAt).toLocaleDateString() : 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{assignment?.rubricId ? 'Has Rubric' : 'No Rubric'}</span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Submissions Grid */}
            <div className="grid gap-6">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl">
                <div className="p-6 border-b border-white/20">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Submissions ({submissions?.length || 0})
                </h3>
                </div>
                
                <div className="p-6">
                {submissions && submissions?.length > 0 ? (
                    <div className="grid gap-4">
                    {submissions.map((submission: any) => (
                        <div
                        key={submission.id}
                        className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 hover:bg-white/90 hover:shadow-lg transition-all cursor-pointer group"
                        >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                                submission.graded 
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                                : submission.workflowState === 'submitted'
                                ? 'bg-gradient-to-br from-blue-400 to-cyan-500'
                                : 'bg-gradient-to-br from-gray-400 to-slate-500'
                            }`}>
                                {submission.graded ? (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                ) : (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-slate-800">{submission.user.name}</h4>
                                <span className="text-sm text-slate-500">({submission.user.asurite})</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                                {submission.group && (
                                    <div className="flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span>{submission.group.name}</span>
                                    </div>
                                )}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    submission.workflowState === 'graded' 
                                    ? 'bg-green-100 text-green-700'
                                    : submission.workflowState === 'submitted'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                    {submission.workflowState.replace('_', ' ').toUpperCase()}
                                </span>
                                {submission.late && (
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                    LATE
                                    </span>
                                )}
                                {submission.missing && (
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                                    MISSING
                                    </span>
                                )}
                                </div>
                            </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                            {submission.attachments && submission.attachments.length > 0 && (
                                <div className="flex items-center gap-1 text-sm text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                </svg>
                                <span>{submission.attachments.length}</span>
                                </div>
                            )}
                            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-md hover:shadow-lg">
                                {submission.graded ? 'Review' : 'Grade'}
                            </button>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg">No submissions yet</p>
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}