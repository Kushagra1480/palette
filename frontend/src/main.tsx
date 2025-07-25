/*
Entry point for the entire application.
 */

import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  GradingMain,
  Home,
  NotFoundPage,
  RubricBuilderMain,
  SettingsMain,
} from "@/features";
import {
  AssignmentProvider,
  CourseProvider,
  DialogProvider,
  RubricProvider,
} from "@/context";

import { SettingsProvider } from "@/context/SettingsContext.tsx";
import TemplatesMain from "@/features/templatesPage/TempatesMain.tsx";
import { ChoiceDialog } from "@/components";
import CourseSelect from "./features/courseSelect/CourseSelect";
import AssignmentDashboard from "./features/assignmentDashboard/AssignmentDashboard";

// Defined a "root" div in index.html that we pull in here and then call the React render method.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsProvider>
      <CourseProvider>
        <AssignmentProvider>
          <RubricProvider>
            <DialogProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/templates" element={<TemplatesMain />} />
                  <Route
                    path="/rubric-builder"
                    element={<RubricBuilderMain />}
                  />
                  <Route path="/grading" element={<GradingMain />} />
                  <Route path="/settings" element={<SettingsMain />} />
                  <Route path="/courses" element={<CourseSelect />} />
                  <Route path="courses/:courseId/assignments/:assignmentId" element={<AssignmentDashboard />} />
                  {/*Any route that doesn't match the routes defined above will go to the 404 page*/}
                  <Route path={"*"} element={<NotFoundPage />} />
                </Routes>
              </Router>
              <ChoiceDialog />
            </DialogProvider>
          </RubricProvider>
        </AssignmentProvider>
      </CourseProvider>
    </SettingsProvider>
  </StrictMode>,
);
