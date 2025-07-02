import { useFetch, useLocalStorage } from "@/hooks";
import { Course, PaletteAPIResponse } from "palette-types";
import { useState, useEffect, useCallback } from "react";
import { Search, Filter, RotateCcw, Calendar, FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseSelect() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [searchTerm, setSearchTerm] = useState("");
  const [cachedCourses, setCachedCourses] = useLocalStorage<Course[]>("cached-courses", [])
  const navigate = useNavigate()
  const { fetchData: getCourses } = useFetch("/courses");

  const fetchCourses = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && cachedCourses.length > 0) {
      setCourses(cachedCourses);
      return;
    }

    setLoading(true);
    setError(undefined);
    
    try {
      const response = await getCourses() as PaletteAPIResponse<Course[]>;
      
      if (response?.success && response.data) {
        setCourses(response.data);
        setCachedCourses(response.data);
        console.log(response.data)
      } else {
        const errorMessage = response?.error || "Failed to fetch courses";
        setError(errorMessage);
        console.error("API Error:", errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? `Network error: ${error.message}` 
        : "An unexpected error occurred while fetching courses";
      
      console.error("Fetch error:", error);
      setError(errorMessage);
      
      // Fallback to cached data if available
      if (cachedCourses.length > 0) {
        setCourses(cachedCourses);
        setError(`${errorMessage}. Showing cached data.`);
      }
    } finally {
      setLoading(false);
    }
  }, [getCourses, cachedCourses, setCachedCourses]); 

  useEffect(() => {
    void fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseClick = (course: Course) => {
    // Navigate to course detail page
    console.log("Selected course:", course);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-700 font-medium">Loading courses...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-red-200/50">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }


return (
 <div className="min-h-screen bg-gray-200 p-6">
   <div className="max-w-5xl mx-auto">
     {/* Header */}
     <div className="flex items-center justify-between mb-8">
       <div className="flex items-center gap-4">
         <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/>
             <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
             <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
             <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
             <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
           </svg>
         </div>
         <div>
           <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
             Your Courses
           </h1>
           <p className="text-slate-600 mt-1">Manage assignments and rubrics</p>
         </div>
       </div>
       
       <div className="flex items-center gap-3">
         <button className="p-3 bg-white/60 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/80 transition-all">
           <RotateCcw className="w-5 h-5 text-slate-600" />
         </button>
         <button className="p-3 bg-white/60 backdrop-blur-md rounded-3xl border border-white/20 hover:bg-white/80 transition-all">
           <Filter className="w-5 h-5 text-slate-600" />
         </button>
         <div className="relative">
           <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
           <input
             type="text"
             placeholder="Search courses..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="pl-12 pr-4 py-3 bg-white/60 border border-white/20 rounded-3xl focus:bg-white/80 focus:ring-2 focus:ring-blue-500/50 focus:outline-none transition-all w-80 placeholder-slate-500"
           />
         </div>
       </div>
     </div>

     <div className="space-y-6">
       {filteredCourses.length === 0 ? (
         <div className="text-center py-16">
           <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
             </svg>
           </div>
           <p className="text-slate-500 text-lg">
             {searchTerm ? "No courses found matching your search." : "No courses available."}
           </p>
         </div>
       ) : (
         filteredCourses.map((course) => (
           <div
             key={course.id}
             className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20  hover:shadow-2xl transition-all duration-300 overflow-hidden"
           >
             {/* Course Header */}
             <div className="p-6 border-b border-white/20">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                     <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                     </svg>
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-slate-900">
                       {course.name}
                     </h3>
                     <p className="text-slate-600 font-medium">{course.term.name}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <div className="text-sm font-medium text-slate-700">
                     {course.assignments?.length || 0} assignments
                   </div>
                   <div className="text-xs text-slate-500">
                     Course #{course.id}
                   </div>
                 </div>
               </div>
             </div>

             {/* Assignments Grid */}
             <div className="p-6">
               <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                 <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                 </svg>
                 Assignments
               </h4>
               
               {course.assignments && course.assignments.length > 0 ? (
                 <div className="grid gap-3 mb-6">
                   {course.assignments.map((assignment) => (
                     <div
                       key={assignment.id}
                       onClick={() => navigate(`/courses/${course.id}/assignments/${assignment.id}`)}
                       className="bg-white/80 backdrop-blur-sm rounded-4xl p-4 border border-white/30 hover:bg-white/90 hover:shadow-lg transition-all cursor-pointer group"
                     >
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                             <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                             </svg>
                           </div>
                           <div>
                             <h5 className="font-semibold text-slate-800 group-hover:text-slate-900">
                               {assignment.name}
                             </h5>
                             <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                               <div className="flex items-center gap-1">
                                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                                 <span>Due {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}</span>
                               </div>
                               <div className="flex items-center gap-1">
                                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                 </svg>
                                 <span>{assignment.pointsPossible || 0} pts</span>
                               </div>
                             </div>
                           </div>
                         </div>
                         <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                           <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                           </svg>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               ) : (
                 <div className="text-center py-8 text-slate-500">
                   <svg className="w-8 h-8 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                   </svg>
                   <p>No assignments found</p>
                 </div>
               )}

               {/* Course Actions */}
               <div className="flex gap-3">
                 <button
                   onClick={() => navigate(`/courses/${course.id}/rubric`)}
                   className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                   Manage Rubrics
                 </button>
                 <button
                   onClick={() => navigate(`/courses/${course.id}`)}
                   className="bg-white/80 backdrop-blur-sm hover:bg-white border border-white/30 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                 >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                   </svg>
                   View Course
                 </button>
               </div>
             </div>
           </div>
         ))
       )}
     </div>
   </div>
 </div>
);
}