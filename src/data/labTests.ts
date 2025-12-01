
import { LabTest } from "./types";

export const labTests: LabTest[] = [
  {
    id: "LT-1001",
    testName: "Complete Blood Count (CBC)",
    testType: "Hematology",
    testCode: "CBC-001",
    status: "completed",
    sampleDate: "2025-03-15T09:30:00",
    reportDate: "2025-03-16T14:00:00",
    doctorName: "Dr. Sarah Johnson",
    department: "Internal Medicine",
    description: "Standard blood test that evaluates overall health and detects a wide range of disorders.",
    results: [
      {
        parameter: "White Blood Cell Count",
        value: 7.5,
        unit: "K/μL",
        normalRange: "4.5-11.0",
        interpretation: "normal"
      },
      {
        parameter: "Red Blood Cell Count",
        value: 5.2,
        unit: "M/μL",
        normalRange: "4.5-5.9",
        interpretation: "normal"
      },
      {
        parameter: "Hemoglobin",
        value: 15.1,
        unit: "g/dL",
        normalRange: "13.5-17.5",
        interpretation: "normal"
      },
      {
        parameter: "Hematocrit",
        value: 45.0,
        unit: "%",
        normalRange: "41.0-53.0",
        interpretation: "normal"
      },
      {
        parameter: "Platelet Count",
        value: 320,
        unit: "K/μL",
        normalRange: "150-450",
        interpretation: "normal"
      }
    ]
  },
  {
    id: "LT-1002",
    testName: "Comprehensive Metabolic Panel",
    testType: "Chemistry",
    testCode: "CMP-002",
    status: "completed",
    sampleDate: "2025-03-15T09:30:00",
    reportDate: "2025-03-16T14:30:00",
    doctorName: "Dr. Sarah Johnson",
    department: "Internal Medicine",
    description: "Group of 14 tests that provides information about the current status of your kidneys, liver, and electrolyte and acid/base balance.",
    results: [
      {
        parameter: "Glucose",
        value: 105,
        unit: "mg/dL",
        normalRange: "70-99",
        interpretation: "high"
      },
      {
        parameter: "Calcium",
        value: 9.5,
        unit: "mg/dL",
        normalRange: "8.6-10.2",
        interpretation: "normal"
      },
      {
        parameter: "Sodium",
        value: 140,
        unit: "mmol/L",
        normalRange: "135-145",
        interpretation: "normal"
      },
      {
        parameter: "Potassium",
        value: 4.0,
        unit: "mmol/L",
        normalRange: "3.5-5.1",
        interpretation: "normal"
      },
      {
        parameter: "CO2",
        value: 22,
        unit: "mmol/L",
        normalRange: "20-29",
        interpretation: "normal"
      }
    ]
  },
  {
    id: "LT-1003",
    testName: "Lipid Panel",
    testType: "Chemistry",
    testCode: "LIP-003",
    status: "pending",
    sampleDate: "2025-04-10T10:15:00",
    doctorName: "Dr. Michael Smith",
    department: "Cardiology",
    description: "Group of tests that measure the amount of specific fats in the blood to assess risk of cardiovascular disease."
  },
  {
    id: "LT-1004",
    testName: "Thyroid Function Panel",
    testType: "Endocrinology",
    testCode: "TFP-004",
    status: "processing",
    sampleDate: "2025-04-08T11:00:00",
    doctorName: "Dr. Jennifer Lee",
    department: "Endocrinology",
    description: "Set of tests used to evaluate the function of the thyroid gland and to help diagnose thyroid disorders."
  },
  {
    id: "LT-1005",
    testName: "Urinalysis",
    testType: "Microbiology",
    testCode: "UA-005",
    status: "completed",
    sampleDate: "2025-03-20T14:45:00",
    reportDate: "2025-03-21T13:30:00",
    doctorName: "Dr. Robert Wilson",
    department: "Urology",
    description: "Test that examines the visual, chemical and microscopic aspects of your urine.",
    results: [
      {
        parameter: "Color",
        value: "Pale Yellow",
        unit: "",
        normalRange: "Pale Yellow to Amber",
        interpretation: "normal"
      },
      {
        parameter: "Clarity",
        value: "Clear",
        unit: "",
        normalRange: "Clear",
        interpretation: "normal"
      },
      {
        parameter: "pH",
        value: 6.0,
        unit: "",
        normalRange: "4.5-8.0",
        interpretation: "normal"
      },
      {
        parameter: "Protein",
        value: "Negative",
        unit: "",
        normalRange: "Negative",
        interpretation: "normal"
      },
      {
        parameter: "Glucose",
        value: "Negative",
        unit: "",
        normalRange: "Negative",
        interpretation: "normal"
      }
    ]
  },
  {
    id: "LT-1006",
    testName: "Liver Function Test",
    testType: "Chemistry",
    testCode: "LFT-006",
    status: "cancelled",
    sampleDate: "2025-03-25T09:00:00",
    doctorName: "Dr. Emily Brown",
    department: "Gastroenterology",
    description: "Group of tests that check for enzymes and proteins produced by the liver cells and released into the bloodstream."
  }
];
