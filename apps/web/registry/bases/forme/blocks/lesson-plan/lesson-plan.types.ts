export interface LessonSequenceItem {
  activity: string;
  description: string;
  notes?: string;
  time: string;
}

export interface LessonAssessment {
  formative?: string[];
  summative?: string[];
}

export interface LessonPlanProps {
  accentColor?: string;
  assessment: LessonAssessment;
  date: string;
  differentiation?: string[];
  duration: string;
  essentialQuestion?: string;
  gradeLevel: string;
  homework?: string;
  lessonTitle: string;
  materials: string[];
  objectives: string[];
  reflection?: string;
  renderingBase?: "takumi" | "forme";
  sequence: LessonSequenceItem[];
  standards?: string[];
  subject: string;
  teacherName: string;
}

export const sampleLessonPlanData: LessonPlanProps = {
  accentColor: "#7c3aed",
  assessment: {
    formative: ["Exit ticket", "Observation"],
    summative: ["Chapter quiz"],
  },
  date: "September 15, 2026",
  differentiation: [
    "Provide equation mats for visual learners",
    "Allow calculator use for students with processing difficulties",
  ],
  duration: "50 minutes",
  essentialQuestion:
    "How can we represent real-world relationships using linear equations?",
  gradeLevel: "8th Grade",
  homework: "Complete worksheet problems 11-20",
  lessonTitle: "Introduction to Linear Equations",
  materials: ["Graph paper", "Rulers", "Calculator", "Whiteboard markers"],
  objectives: [
    "Define linear equations",
    "Graph linear equations on a coordinate plane",
    "Solve simple linear equations",
  ],
  reflection:
    "Students grasped the concept of slope well. Need additional time on graphing negative coordinates next session.",
  sequence: [
    {
      activity: "Warm-up",
      description: "Review solving one-step equations",
      notes: "Individual work on whiteboards",
      time: "5 min",
    },
    {
      activity: "Introduction",
      description: "Define linear equations, show examples",
      notes: "Direct instruction with slides",
      time: "10 min",
    },
    {
      activity: "Guided Practice",
      description: "Work through 3 examples together",
      notes: "Pair-share problem #2",
      time: "15 min",
    },
    {
      activity: "Independent Practice",
      description: "Complete worksheet problems 1-10",
      notes: "Circulate for formative check",
      time: "15 min",
    },
    {
      activity: "Closure",
      description: "Exit ticket: solve one linear equation",
      notes: "Collect at door",
      time: "5 min",
    },
  ],
  standards: ["CCSS.MATH.8.EE.B.6", "CCSS.MATH.8.EE.C.7"],
  subject: "Mathematics",
  teacherName: "Ms. Johnson",
};
