# Phase 0: Principles

Summarize this content and the most important principles and guidelines for a frontend developer. Give me a bullet list with an alias a short description (reduced sentence) for each. I need a list with the most important ones and those that are a MUST.

Docs: [here](<https://training.lidr.co/posts/ai4devs-202510-seniors-%F0%9F%93%84-buenas-practicas-para-el-desarrollo-frontend-%F0%9F%94%B4-9-min>)

# Phase 1: Metaprompting

## Prompt A: Generate the main prompt

You are an expert prompt engineer following spec driven design practices and AI assisted development using Claude Code and Antigravity. 

Help me write the final prompt in markdown format and all in english based on the following instructions that I have received, but I don't want to use the full content.

### INSTRUCTIONS

@LTI-frontend-instructions.md

### ROLE

You are an expert frontend developer and backend architect with experience in ATS (Application Tracking System).

### CONTEXT

Analyze the current project status, structure, implementation and guidelines using README.md.

You always apply the best principles and guidelines in your implementation, for instance:
- Domain Driven Design
- SOLID/DRY
- Design patterns
- Simple UI (KISS)
- Clear Project Structure (hexagonal, vertical slicing, screaming)
- Code Consistency (Linting & Formatting)
- Performance First (optimize assets and use lazy loading)
- Responsive Design
- User Input Validation & Sanitization
- HTTPS Only, encrypt data in transit
- Reuse Frameworks & Components, using proven tools

Once you've reviewed everything, provide:
- Summary of 3-5 key architectural/design decisions
- Assumptions you'll make
- Clarifying questions you have (if any)
- Proposed ABC plans if needed

<details>
<summary>Click to expand output (LLM Generated)</summary>

```markdown
# Frontend Development Task: Kanban Position View for LTI ATS

## Role
You are an expert frontend developer and backend architect with experience in ATS (Application Tracking System) development. You follow best practices including Domain Driven Design, SOLID/DRY principles, design patterns, and prioritize clean architecture, code consistency, performance, and security.

## Context
Analyze the current project structure, implementation patterns, and guidelines by reviewing the codebase, particularly:
- Project structure and organization
- Existing component patterns and conventions
- Current routing implementation
- API integration patterns
- State management approach
- Styling methodology
- Technology stack in use

## Objective
Create a new "position" detail page with a Kanban-style interface to visualize and manage candidates through different hiring process stages. Users should be able to drag and drop candidate cards between columns representing interview phases.

## Requirements

### Functional Requirements
1. **Navigation**: When clicking "Ver proceso" button on any position card in the positions list, navigate to the position detail view
2. **Kanban Board**:
   - Display candidates as draggable cards organized in columns
   - Each column represents an interview phase
   - Support drag-and-drop to move candidates between phases
   - Update candidate phase via API when dropped
3. **Display Requirements**:
   - Show position title at the top for context
   - Include back arrow (left of title) to return to positions list
   - Display columns for each interview phase in the process
   - Each candidate card shows: full name and average score
   - Position on appropriate column based on current interview step
4. **Responsive Design**: Adapt layout for mobile (vertical columns, full width)

### Technical Specifications

#### Available API Endpoints

**GET /positions/:id/interviewFlow**
- Returns interview process information for a position
- Response includes:
  - `positionName`: Position title
  - `interviewFlow.interviewSteps`: Array of phases with id, name, and orderIndex

**GET /positions/:id/candidates**
- Returns all candidates for a specific position
- Response includes array of candidates with:
  - `fullName`: Candidate's full name
  - `currentInterviewStep`: Current phase name
  - `averageScore`: Average score (0-5)

**PUT /candidates/:id/stage**
- Updates candidate's interview stage
- Request body:
  {
    "applicationId": "1",
    "currentInterviewStep": "3"
  }

### Design Requirements
- Follow existing UI patterns and component library
- Apply responsive design principles (KISS)
- Ensure accessibility standards
- Optimize performance (lazy loading, efficient re-renders)
- Validate and sanitize user inputs
- Maintain code consistency with linting/formatting rules

## Best Practices to Apply
- **Architecture**: Hexagonal/vertical slicing, clear separation of concerns
- **Code Quality**: SOLID/DRY principles, design patterns
- **Performance**: Optimize assets, implement lazy loading, minimize re-renders
- **Security**: Validate inputs, sanitize data, secure API calls
- **Reusability**: Leverage existing frameworks and components
- **Consistency**: Follow project conventions for naming, structure, and styling

## Deliverables
1. New position detail page/view with Kanban board functionality
2. Routing configuration to navigate from positions list
3. API integration for fetching and updating data
4. Drag-and-drop implementation
5. Responsive layout (desktop and mobile)
6. Code following project conventions and best practices

## Instructions

### Phase 1: Analysis
1. Review the project README.md and codebase structure
2. Identify:
   - Current routing setup and patterns
   - Component architecture and conventions
   - API integration approach (services, hooks, state management)
   - Styling methodology (CSS modules, styled-components, Tailwind, etc.)
   - Existing drag-and-drop libraries (if any)
   - TypeScript interfaces/types patterns

### Phase 2: Planning
Provide:
1. **Summary of 3-5 key architectural/design decisions** you've identified in the codebase
2. **Assumptions** you'll make for implementation
3. **Clarifying questions** (if any) about:
   - Preferred drag-and-drop library
   - State management approach for Kanban updates
   - Error handling patterns
   - Loading states UI
   - Candidate card click behavior (if any)
4. **Proposed implementation plans** (if multiple valid approaches exist)

### Phase 3: Implementation
Once approved, implement the solution following identified patterns and best practices.

---

**Notes:**
- Assume the positions list page already exists
- Assume global page structure (header, footer) is already in place
- Focus on creating the internal page content for the position detail view
- Maintain consistency with existing codebase patterns
```

</details>


# Phase 2: Context & Architecture

## Prompt B: Review & clarify assumptions

You must use this as reference for the UI design. Here is the [link](<https://media1-production-mightynetworks.imgix.net/asset/a827447c-4254-4458-9c44-6540fde8e3b8/1718804691847.png?ixlib=rails-4.2.0&fm=jpg&q=75&auto=format&w=1400&h=1400&fit=max&impolicy=ResizeCrop&constraint=downsize&aspect=fit>)

## Prompt C: Propose ABC plans if needed

# Phase 3: Implementation (Per Feature)

## Prompt D: Implement Feature 1

screenshot 2. each candidate should have some icons (1 to 5 green circles) based on their score, use provided link as reference

screenshot 3. it's throwing an error "Error al obtener el flujo de entrevista: Network Error"

## Prompt E: Implement Feature 2

drag&drop works on mock mode. now I want it to use backend as well so you guarantee that the data is updated

mock mode works. now I want it to use backend as well so you guarantee that the data is updated

# Phase 4: Closing

## Prompt F: Documentation

document the implementation in a markdown file, properly located based on project structure

## Prompt G: PR description

give me a short PR description (markdown format to copy and paste) for this branch to solve the requirements:
- design and coding principles
- implementation summary
- documentation
- testing
- next steps (if any)

## Prompt H: Tests (if necessary)

## Prompt I: Categorize prompts

Analyze all the prompts generated in this session and classify them by thematic categories.

**For each category show:**
- 🏷️ **Name**: 
- 📋 **Included prompts**: [ID/Title 1, ID/Title 2...]
- 🔢 **Total**: X prompts

**Conclusions:**
- 🥇 **Dominant category**: [Name] (X prompts)
- ⚖️ **Areas to balance**: [Categories with <X suggested prompts]

*Format: Clean Markdown with emojis and lists.*