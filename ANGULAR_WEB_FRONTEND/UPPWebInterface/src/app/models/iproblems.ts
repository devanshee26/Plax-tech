export interface Iproblems {
  _id: string;
  title: string;
  ProblemStatement: string;
  TimeLimit: number;
  MemoryLimit: number;
  SampleTestCases: [{
    test: string,
    output: string
  }];
  TestCases: [{
    test: string,
    output: string
  }];
  Solution: [
    {
      language: string
      code: string
    }
  ];
  author: string;
}
