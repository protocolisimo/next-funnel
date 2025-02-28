export const getNextQuestionId = (
    currentQuestionId: string,
    answer: string,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    surveyConfig: Record<string, any>
  ): string | null => {
    
    const question = surveyConfig.onboarding.find((q: {id: string}) => q.id === currentQuestionId);
  
    if (!question) return null;
  
    if (typeof question.next === "string") {
      return question.next;
    }
  
    if (typeof question.next === "object") {
        console.log(question.next[answer])
      return question.next[answer] || null;
    }
  
    return null;
  };