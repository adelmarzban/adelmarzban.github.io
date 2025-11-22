
export interface CurrentUser {
  email: string;
}

export interface Feeling {
  name: string;
  score: number;
}

export interface NegativeThought {
  id: number;
  description: string;
  score: number;
  challenge_distortion: string;
  challenge_experience: string;
  challenge_others: string;
  challenge_anotherWay: string;
  alternativeThought: string;
  conclusion: string;
}

export interface ThoughtLogEntry {
  id: number;
  situation: string;
  feelings: Feeling[];
  negativeThoughts: NegativeThought[];
}

export interface UserData {
  password?: string;
  answers: boolean[];
  thoughtLog: ThoughtLogEntry[];
  unlockedSteps: string[];
}

export interface JourneyStep {
  id: string;
  title: string;
  icon: string;
}
