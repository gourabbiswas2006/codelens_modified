export type Mode =
  | 'explain'
  | 'debug'
  | 'error'
  | 'knowledge'
  | 'documents'
  | 'compliance'
  | 'analytics';

export type Language =
  | 'javascript'
  | 'python'
  | 'cpp'
  | 'typescript'
  | 'html'
  | 'css'
  | 'java'
  | 'go'
  | 'rust'
  | 'sql';

export type ExplainLevel = 'beginner' | 'analogy' | 'deepdive';

export interface LineExplanation {
  line: number;
  code: string;
  explanation: string;
  concept?: string;
  analogy?: string;
}

export interface ExplainResponse {
  language: string;
  summary: string;
  difficulty?: string;
  keyConcepts?: string[];
  explanations: LineExplanation[];
}

export interface DebugResponse {
  hasError: boolean;
  errorType?: string;
  line?: number;
  codeLine?: string;
  explanation: string;
  whyItHappened?: string;
  suggestion: string;
  correctedCode: string;
}

export interface ErrorTranslationResponse {
  errorType: string;
  location?: string;
  simpleExplanation: string;
  likelyCause?: string;
  suggestedFix: string;
  codeExample?: string;
}

export interface CodeExample {
  id: string;
  name: string;
  language: Language;
  description: string;
  code: string;
  buggyCode?: string;
  terminalError?: string;
}

// Enterprise Knowledge & Document Types
export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  linesOrPages: number;
  status: 'indexed' | 'processing' | 'ready';
  contentSnippet: string;
}

export interface Citation {
  documentName: string;
  location: string;
  snippet: string;
}

export interface QAMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: Citation[];
}

export interface ComplianceCheckItem {
  id: string;
  name: string;
  status: 'compliant' | 'warning' | 'non-compliant';
  category: string;
  description: string;
  remediation: string;
}

export interface ComplianceResponse {
  score: number;
  statusText: string;
  totalChecks: number;
  passedChecks: number;
  warningChecks: number;
  failedChecks: number;
  items: ComplianceCheckItem[];
  summary: string;
}

export interface DocumentRisk {
  title: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  recommendation: string;
}

export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  deadline: string;
  completed: boolean;
}

export interface DocumentInsights {
  executiveSummary: string;
  keyTopics: string[];
  importantDates?: string[];
  peopleOrOrgs?: string[];
  keyPolicies?: string[];
  risks: DocumentRisk[];
  actionItems: ActionItem[];
  missingInformation?: string[];
  evidenceStrength: number;
}

export interface DebugLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  message: string;
  category?: 'AI' | 'API' | 'RAG' | 'DOC' | 'SYS';
  details?: Record<string, any>;
}

export interface RAGSearchResult {
  query: string;
  retrievedDocs: {
    name: string;
    pageOrLine: string;
    relevanceScore: number;
    chunkSnippet: string;
  }[];
}

