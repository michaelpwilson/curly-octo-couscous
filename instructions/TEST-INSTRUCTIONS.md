# SureCloud
## UI Developer Coding Challenge

### Overview
The following ticket is a good example of how work is defined at SureCloud, albeit with arbitary subject matter.
Please follow the instructions below to complete the task. You can spend as long as you need on the challenge with a guideline of around 2-4hours.

When complete, please delete `node_modules` & zip the folder up and return to SureCloud prior to the next interview stage.

### Challenge Rules
- run `npm install` to add local dependencies.
- Use only the default libraries provided in `package.json`, (Angular, TypeScript, RxJS).
- No other libraries should be used/installed.
- If you prefer to use `scss`, please amend the project configuration to do so.
- Try to structure code as if was part of a normal large-scale production project.
- Bonus Points for Unit/Component tests.
- No server-side code is neccessary. Use browser capabilities to persist relevent data.

Please complete the following user story:

### User Story
As a user,
I want to see pictures of different dogs on a webpage
So that I can look at different dog pictures throughout the day and save my favourite ones.

### Acceptance Criteria
- The page should be built to match the provided mock up. [Link to Figma File](https://www.figma.com/file/kZCajOuOrelS6dsSFEpBb8/Dog-Library-Front-End-Test-(shared)?node-id=0%3A1) or [Link to PNG](./dog-library-mock-up.png)
- The page must cycle through random dog pictures returned by `https://dog.ceo/api/breeds/image/random` (if you have issues with the API, then feel free to mock some data in the project.)
- A new dog picture should show on screen every 3 seconds.
- Clicking "Like" button should save the image & display it in gallery format inside the "Favourite Dogs" section.
- The user should be able to start and stop the image cycle, using the "Start" & "Stop" buttons.
