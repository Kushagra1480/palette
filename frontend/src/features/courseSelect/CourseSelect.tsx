import { useFetch, useLocalStorage } from "@/hooks";
import { Course, PaletteAPIResponse } from "palette-types";
import { useState, useEffect, useCallback } from "react";
import { Search, Filter, RotateCcw, Calendar, FileText, Users } from "lucide-react";

export default function CourseSelect() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [searchTerm, setSearchTerm] = useState("");
  const [cachedCourses, setCachedCourses] = useLocalStorage<Course[]>("cached-courses", [])

  const { fetchData: getCourses } = useFetch("/courses");

  const fetchCourses = useCallback(async (forceRefresh = false) => {
    // Use cached data if available and not forcing refresh
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-palette-icon lucide-palette"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
            <h1 className="text-2xl font-semibold text-gray-900">Your Courses</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-3 hover:cursor-pointer transition-colors">
              <RotateCcw className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-3 hover:cursor-pointer transition-colors">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all w-64"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {searchTerm ? "No courses found matching your search." : "No courses available."}
            </div>
          ) : (
            filteredCourses.map((course) => (
           <div
              key={course.id}
              onClick={() => handleCourseClick(course)}
              className="bg-white rounded-4xl p-7 hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 hover:border-gray-200"
              >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {course.name}
                </h3>
                <p className="text-lg text-gray-600">
                  {course.term.name}
                </p>
              </div>
              </div> 
            ))
          )}
        </div>
      </div>
    </div>
  );
}