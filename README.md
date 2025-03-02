This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.


## Deploy

To create a production ready build run:
```bash 
    npm run build
```

In order to inpect it in you browser run
```bash 
    npm run start
```


# Survey App

This project is a dynamic survey application built with **Next.js**, **TypeScript**, and **Redux**. It supports multiple survey configurations and dynamically renders survey pages based on a JSON configuration.

## 📁 Project Structure

```bash
/pages
  ├── survey
  │    ├── [id].tsx    # Dynamic survey question pages
  ├── _app.tsx         # Main app component with Redux Provider
/store
  ├── surveySlice.ts   # Redux slice for managing survey state
  ├── themeSlice.ts    # Redux slice for managing theme state
/components
  ├── containers       # Custom UI containers for survey questions
  ├── layouts          # Layout components
/config
  ├── survey.json      # Config file for survey structure
/lib
  ├── getDynamicQuestion.ts  # Handles dynamic question logic
```

---

## 📜 How `survey.json` Works

The `survey.json` file contains the survey structure, defining each question, its type, possible answers, and conditional navigation.

### Example Structure:

```json
{
  "id": "gender",
  "type": "single_choice",
  "title": "Select your gender:",
  "options": ["Female", "Male"],
  "next": "partner"
}
```

- id: Unique identifier for the question.
- type: Defines the type of response (single_choice, text, etc.).
- title: The displayed question text.
- options: Available choices (for multiple-choice questions).
- next: Defines the next question after an answer is given.
- configuration (optional): Allows conditional logic to adjust the question based on previous answers.


## Conditional Logic:

If a question has configuration, it adapts dynamically based on previous responses. Example:

```json
{
  "id": "parent",
  "type": "single_choice",
  "options": ["Yes", "No"],
  "next": "problem",
  "configuration": [
    {
      "conditions": { "partner": ["Single"] },
      "values": [{ "title": "Are you a single parent?" }]
    },
    {
      "conditions": { "partner": ["In a relationship"] },
      "values": [{ "title": "Are you a parent?" }]
    }
  ]
}
```

# This means:

- If partner = Single, the title will change to "Are you a single parent?"
- If partner = In a relationship, the title will change to "Are you a parent?"


## 🛠 How to Add New Containers
Survey screens are rendered using containers from /components/containers. Each screen type (single_choice, text, etc.) corresponds to a specific container.

Step 1: Create a New Container
- Go to /components/containers/ and create a new file, e.g., MultiChoice.tsx.
- Implement the UI logic:

```tsx
import React from "react";

export default function MultiChoice({ params, handleAnswer }: { params: any, handleAnswer: (answer: string[]) => void }) {
    return (
        <div>
            <h2>{params.title}</h2>
            {params.options.map((option: string) => (
                <button key={option} onClick={() => handleAnswer([option])}>
                    {option}
                </button>
            ))}
        </div>
    );
}
```
Step 2: Register the Container
- Open /components/containers/index.ts.
- Add your new container to the map:

```tsx
import MultiChoice from "./MultiChoice";

const SURVAY_CONTAINERS_MAP = {
    single_choice: SingleChoiceContainer,
    text: TextContainer
    multi_choice: MultiChoice, // 👈 Add this line
};

export default SURVAY_CONTAINERS_MAP;
```

Step 3: Use the New Container in survey.json
- Update survey.json to reference the new container type:

```json
{
  "id": "hobbies",
  "type": "multi_choice",
  "title": "Select your hobbies:",
  "options": ["Reading", "Traveling", "Gaming", "Cooking"],
  "next": "end"
}
```