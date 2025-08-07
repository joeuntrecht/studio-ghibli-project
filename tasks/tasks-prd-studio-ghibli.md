# Task List: Studio Ghibli Films Application

## Relevant Files

- `packages/backend/src/schemaModules/ghibli/queries.ghibliSchema.ts` - GraphQL queries for film data
- `packages/backend/src/schemaModules/ghibli/objectTypes.ghibliSchema.ts` - GraphQL type definitions
- `packages/backend/src/services/Http/Http.service.ts` - HTTP service for API calls
- `packages/frontend/src/modules/home/Home.tsx` - Main home component with film buttons
- `packages/frontend/src/shared/components/FilmCard.tsx` - Interactive film card component
- `packages/frontend/src/graphql/queries/index.ts` - Frontend GraphQL queries
- `packages/frontend/src/graphql/gen/graphql.ts` - Generated GraphQL types
- `packages/frontend/src/shared/styles/global.ts` - Global styles and responsive design
- `packages/frontend/src/shared/components/LoadingButton.tsx` - Loading state button component

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.

## Tasks

- [x] 1.0 Backend GraphQL Setup and API Integration
  - [x] 1.1 Update GraphQL schema objectTypes to include Film type with all required fields
  - [x] 1.2 Create GraphQL queries for individual film and all films
  - [x] 1.3 Implement HTTP service to connect to Studio Ghibli API
  - [x] 1.4 Create resolvers to fetch film data from external API
  - [x] 1.5 Add error handling for API failures
  - [x] 1.6 Test backend GraphQL endpoints

- [x] 2.0 Frontend GraphQL Integration and Code Generation
  - [x] 2.1 Set up Apollo Client configuration
  - [x] 2.2 Configure GraphQL codegen for type generation
  - [x] 2.3 Generate typed GraphQL hooks and queries
  - [x] 2.4 Create frontend GraphQL query files
  - [x] 2.5 Test GraphQL integration

- [ ] 3.0 Film Button Interface and Loading States
  - [x] 3.1 Create LoadingButton component with loading state
  - [x] 3.2 Implement Home component with four film buttons
  - [x] 3.3 Add click handlers for film button interactions
  - [x] 3.4 Implement loading states for button clicks
  - [x] 3.5 Style buttons according to Zeplin designs
  - [x] 3.6 Test button interactions and loading states

- [ ] 4.0 Interactive Film Cards and Responsive Design
  - [ ] 4.1 Create FilmCard component with flip animation
  - [ ] 4.2 Implement card front (image and title)
  - [ ] 4.3 Implement card back (banner, description, director, release date, runtime, Rotten Tomatoes score)
  - [ ] 4.4 Add hover interactions for desktop
  - [ ] 4.5 Add click interactions for mobile
  - [ ] 4.6 Implement responsive design (single column on mobile)
  - [ ] 4.7 Ensure mobile compatibility down to 320px
  - [ ] 4.8 Test card interactions on both desktop and mobile

- [ ] 5.0 Testing and Bonus Features
  - [ ] 5.1 Write unit tests for all components
  - [ ] 5.2 Write integration tests for GraphQL queries
  - [ ] 5.3 Test responsive design across different screen sizes
  - [ ] 5.4 Implement "...rest" button for all remaining films
  - [ ] 5.5 Add error boundaries and error handling
  - [ ] 5.6 Run full test suite and fix any issues
