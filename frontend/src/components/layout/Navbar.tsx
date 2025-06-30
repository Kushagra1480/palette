import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
  ActiveAssignmentSelection,
  ActiveCourseSelection,
  AssignmentSelectionMenu,
  CourseSelectionMenu,
  Dialog,
} from "@/components";
import clsx from "clsx";

export function Navbar() {
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null);

  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [assignmentDialogOpen, setAssignmentDialogOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const selectCourseSectionAssignmentPaths = ["/rubric-builder", "/grading"];

  /**
   * Map paths to nav button labels.
   *
   * To add a new nav button, add a new pair to the list and ensure the route is set up to display the corresponding
   * page.
   */
  const navOptions = {
    "/templates": "Templates",
    "/rubric-builder": "Builder",
    "/grading": "Grading",
  };
  const currentPath = location.pathname;
  const isActive = (path: string) => currentPath === path;

  const renderNavButtons = () => (
    <div className="flex flex-col backdrop-blur-sm">
      {Object.entries(navOptions).map(([path, label]) => (
        <button
          key={path}
          disabled={isActive(path)}
          className={clsx(
            "px-4 py-2 rounded-lg font-medium text-lg transition-all duration-200 cursor-pointer flex items-center gap-3 tracking-tight",
            isActive(path)
              ? "bg-blue-500 text-white shadow-sm border border-gray-200/50"
              : ""
          )}
          onClick={() => navigate(path)}
        >
          {label === "Templates" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-layout-panel-top-icon lucide-layout-panel-top"><rect width="18" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/></svg>
          )}
          
          {label === "Builder" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-blocks-icon lucide-blocks"><rect width="7" height="7" x="14" y="3" rx="1"/><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"/></svg>
          )}

          {label === "Grading" && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-open-check-icon lucide-book-open-check"><path d="M12 21V7"/><path d="m16 12 2 2 4-4"/><path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"/></svg>
          )}
          <span>{label} </span>
        </button>
      ))}
    </div>
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserAnchor(null);
  };

  const handleLogoutClicked = () => {
    navigate("/");
  };

  function handleSettingsClicked() {
    navigate("/settings");
  }

  return (
  <nav className="fixed top-0 left-0 bottom-0 z-50 w-80">
    {/* Liquid glass background with enhanced blur and transparency */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-white/90 backdrop-blur-3xl backdrop-saturate-200"></div>
    
    {/* Multiple layered glass effects */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/40 backdrop-blur-2xl"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent backdrop-blur-xl"></div>
    
    {/* Liquid glass border with subtle glow */}
    <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-white/80 via-black/10 to-white/60 shadow-lg"></div>
    <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent blur-sm"></div>
    
    {/* Inner highlight edge */}
    <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/90 via-white/60 to-white/80"></div>
    
    <div className="relative flex flex-col h-full p-6">

      {/* Main navigation */}
      <div className="flex-1 content-center">
        {currentPath !== "/" && renderNavButtons && (
          <div className="">
            {renderNavButtons()}
          </div>
        )}

      </div>

      {/* User profile section at bottom */}
      {currentPath !== "/" && (
        <div className="mt-auto pt-6 border-t border-white/30">
          <div className="relative group">
            <button
              className="w-full px-4 py-3 bg-gradient-to-r from-white/70 to-white/50 hover:from-white/90 hover:to-white/70 backdrop-blur-2xl border border-white/50 hover:border-white/70 rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-lg hover:shadow-xl"
              onClick={handleOpenUserMenu}
            >
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent rounded-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/30 to-pink-600/30 backdrop-blur-xl border border-white/40 text-gray-700 rounded-2xl font-semibold flex items-center justify-center shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl opacity-60"></div>
                  <span className="relative">P</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-800">Profile</div>
                  <div className="text-xs text-gray-600">Manage account</div>
                </div>
                <div className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Enhanced liquid glass dropdown menu */}
      <Menu
        sx={{ 
          ml: "320px",
          mt: "-60px",
          "& .MuiPaper-root": {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(40px) saturate(200%)",
            WebkitBackdropFilter: "blur(40px) saturate(200%)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
            minWidth: "200px",
            overflow: "hidden"
          },
          "& .MuiMenuItem-root": {
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
            padding: "12px 16px",
            margin: "4px 8px",
            borderRadius: "12px",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(20px)",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
            }
          }
        }}
        id="user-menu"
        anchorEl={userAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(userAnchor)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleSettingsClicked}>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gradient-to-br from-gray-400/30 to-gray-500/30 backdrop-blur-xl rounded-lg border border-white/30 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
            Settings
          </div>
        </MenuItem>
        <MenuItem onClick={handleLogoutClicked}>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gradient-to-br from-red-400/30 to-red-500/30 backdrop-blur-xl rounded-lg border border-white/30 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            Logout
          </div>
        </MenuItem>
      </Menu>
      
      {/* Dialogs remain the same */}
      <Dialog
        isOpen={courseDialogOpen}
        onClose={() => setCourseDialogOpen(false)}
        title={"Course Selection"}
      >
        <CourseSelectionMenu onSelect={setCourseDialogOpen} />
      </Dialog>
      <Dialog
        isOpen={assignmentDialogOpen}
        onClose={() => setAssignmentDialogOpen(false)}
        title={"Assignment Selection"}
      >
        <AssignmentSelectionMenu onSelect={setAssignmentDialogOpen} />
      </Dialog>
    </div>
  </nav>
);
}

export default Navbar;