# IonicApp

### Design Purpose
The app is aiming to help students to improve their study efficiency by giving them supports on recording their study events. It's a study diary app. <br />
<br />
This idea is from many existing sport dairy app and food dairy app. People like to use sport dairy app to record their training lifes and use food dairy app to manage their energy intakes, then why couldn't we have an app to record and manage our studies specifically? Therefore, I am aiming to build an app which people can use to record experiences and progress gained from their daily studies, and then the app can provide feedbacks based on the recorded events to users, helping them to draw better idea of learning.<br />
<br />
### App Description
This is a todo-list kind app written in AngularJs with Ionic framework. The benefit of using Ionic is that the app can be deployed to either iOS or Android platform by just building a single code based app. The app has 8 basic pages, login page, sign-up page, reset-password page, home page, study-list page, study-detail page, create-study page and profile page. The following screen-shots are taken while the app is running on iOS simulator. <br />

#### 1 Login Page
<img src="https://github.com/AlexLy1/IonicApp/blob/master/AppScreenShots/LoginPage.png" alt="alt text" width="300" height="600"> <br />
This login page guarantees that only when a user has an account, can the user get access to other assets of the app. The page simply has a login title, two text fields for writting login details, a button for login and two links that are connected to sign-up page and reset-password page respectively.  <br />
#### 2 Sign-up Page
<img src="https://github.com/AlexLy1/IonicApp/blob/master/AppScreenShots/signUp.png" alt="alt text" width="300" height="600"> <br />
This sign-up page is for user to create a new account. It basically has a sign-up title, a back button to navigate back to the login page, two text fields for inputting account infomation and a create account button. <br />
#### 3 Reset-password Page
<img src="https://github.com/AlexLy1/IonicApp/blob/master/AppScreenShots/resetPassword.png" alt="alt text" width="300" height="600"> <br />
This reset-password page is for users who forget their account password and wanna reset their password. The page has a back button that can navigate back to the login page, a title of the page and a text field with a button to do verification. <br />
#### 4 Home page
<img src="https://github.com/AlexLy1/IonicApp/blob/master/AppScreenShots/homePage.png" alt="alt text" width="300" height="600"> <br />
After successfully logging in, home page gets displayed. Home page's title specifies the main purpose of the app "Study Diary" and has two buttons linking to create new study note page and study list page respectively. A small icon on the top right is the entry of the profile page. <br />
#### 5 Create-study Page
<img src="https://github.com/AlexLy1/IonicApp/blob/master/AppScreenShots/createStudy.png" alt="alt text" width="300" height="600"> <br />
This page is for user to record a new study event. In this page, users need to specify categories for a new study event, including method, subject, approximate time spend and the date of the study. When users finish and come back to review the study, these categories can potentially help them improve their learning skills. 
#### 6 Study-list Page
<img src="https://github.com/AlexLy1/IonicApp/blob/master/AppScreenShots/studyList.png" alt="alt text" width="300" height="600"> <br />
This is the page which lists all the created study events. It has a back button that can navigate back to the home page, a page title specifying "Study Notes" and a list view of the created notes. Each note is a tappable card that shows all related attributes and can navigate to corresponding study-detail page by tapping on it.
#### 7 Study-detail Page
<img src="https://github.com/AlexLy1/IonicApp/blob/master/AppScreenShots/studyDetail.png" alt="alt text" width="300" height="600"> <br />
This is the page that shows details of a study event. The top bar of the page has a back button that can navigate the page back to the study list page and a title consisting of the current event's category and subject. The content of the page has a card view for showing the details of the current study event. The card is composed of a picture and a text field, which means user can upload a picture with text description to record the study event. Also date and spent time attribute of the study event are also displayed below the card. 
#### 8 Profile Page
<img src="https://github.com/AlexLy1/IonicApp/blob/master/AppScreenShots/profile.png" alt="alt text" width="300" height="600"> <br />
This is the profile page of the app. It has a logout button on the top right that navigates back to the login page and a back button on the top left that navigates back to the home page. The content of this page contains information of the current user, including a small avatar, the user name, the date of birth, the account's email address and the account's password. User is able to change the account's setting via this page.
