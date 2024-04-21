import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('ce697522-e1cd-40a1-98f7-2c8a18243c55', '1Nels26@yahoo.com', 'Dave Lee', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('290ecf92-526f-4148-9d22-0629b07da427', '7Alba.Deckow@hotmail.com', 'Bob Johnson', 'https://i.imgur.com/YfJQV5z.png?id=9', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('ab14dea4-ab36-4820-8616-fc78fd7fb7aa', '13Savanna.Jakubowski65@hotmail.com', 'Bob Johnson', 'https://i.imgur.com/YfJQV5z.png?id=15', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('c89cc3c4-d684-4bfa-957a-59eecfcac262', '25Seth_Waelchi28@hotmail.com', 'Eva Brown', 'https://i.imgur.com/YfJQV5z.png?id=27', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('37596b0f-0c47-4a97-b51c-1b2b2e21f07f', '31Dillan23@hotmail.com', 'Dave Lee', 'https://i.imgur.com/YfJQV5z.png?id=33', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('20f0a111-13bc-4b6a-8095-4aa7884ca7c6', '37Major52@hotmail.com', 'Carol Martinez', 'https://i.imgur.com/YfJQV5z.png?id=39', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('6d4e3856-89d4-4635-91bb-a09f1f1c85c7', '43Jett_Frami62@yahoo.com', 'Carol Martinez', 'https://i.imgur.com/YfJQV5z.png?id=45', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('dd1cb770-bac2-40ab-ba79-e0832ead35f6', '49Cameron62@yahoo.com', 'Eva Brown', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('7e2ed655-bd45-432d-b1fd-a40017edc0da', '55Lonzo86@hotmail.com', 'Alice Smith', 'https://i.imgur.com/YfJQV5z.png?id=57', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('062ed64f-f6d8-494f-8d5d-13ca371c34a7', 'Customization Tips', 'Reminder You have a pending survey to complete.', 'Alice Johnson', '64Alessandra.Lindgren-Metz59@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=65', 'https://i.imgur.com/YfJQV5z.png?id=66', '20f0a111-13bc-4b6a-8095-4aa7884ca7c6');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('ed59f7e4-0557-4056-addc-2fa8a1a8b3fe', 'Customization Tips', 'Your survey has been updated successfully.', 'Alice Johnson', '71Kolby.Torp-Marvin65@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=72', 'https://i.imgur.com/YfJQV5z.png?id=73', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('2eb9ea2b-8add-44b7-81ac-dcd991f3c3fd', 'Survey Update', 'Learn how to make your surveys more engaging with our latest customization features.', 'Alice Johnson', '78Thelma28@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=79', 'https://i.imgur.com/YfJQV5z.png?id=80', '20f0a111-13bc-4b6a-8095-4aa7884ca7c6');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('d64cfdb8-a7f7-438f-ad5f-68eb2da01e14', 'New Survey Available', 'A new feedback has been posted on your survey.', 'Mike Brown', '85Elena.Rutherford84@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=86', 'https://i.imgur.com/YfJQV5z.png?id=87', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('c0cc3c0d-1f84-44bb-8379-03fa823b5656', 'New Survey Available', 'Reminder You have a pending survey to complete.', 'Mike Brown', '92Travis.Cassin99@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=93', 'https://i.imgur.com/YfJQV5z.png?id=94', '37596b0f-0c47-4a97-b51c-1b2b2e21f07f');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('9f3e37fa-b78f-478b-8849-80fdd6ae35e2', 'New Survey Available', 'Learn how to make your surveys more engaging with our latest customization features.', 'Emma Wilson', '99Korbin_Stark-Kunde@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=100', 'https://i.imgur.com/YfJQV5z.png?id=101', 'c89cc3c4-d684-4bfa-957a-59eecfcac262');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('a579b7dc-7c27-4bcc-a854-1c7bbadc195e', 'Survey Completion Reminder', 'Your survey has been updated successfully.', 'Alice Johnson', '106Myrtis2@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=107', 'https://i.imgur.com/YfJQV5z.png?id=108', '290ecf92-526f-4148-9d22-0629b07da427');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('5cfdb3ce-52d9-4548-aca8-a8b196538515', 'New Survey Available', 'Learn how to make your surveys more engaging with our latest customization features.', 'Alice Johnson', '113Bernice_Murray@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=114', 'https://i.imgur.com/YfJQV5z.png?id=115', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('94648dd0-5c3a-4e73-9cfc-a03e64821747', 'Customization Tips', 'A new feedback has been posted on your survey.', 'Emma Wilson', '120Anya67@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=121', 'https://i.imgur.com/YfJQV5z.png?id=122', 'ab14dea4-ab36-4820-8616-fc78fd7fb7aa');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('1b471a4b-31b1-47a9-ab83-8a324e65b909', 'Survey Update', 'Check out the new survey created by our team', 'Alice Johnson', '127Rocky_Skiles@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=128', 'https://i.imgur.com/YfJQV5z.png?id=129', 'c89cc3c4-d684-4bfa-957a-59eecfcac262');

INSERT INTO "theme" ("id", "color", "font") VALUES ('33c8f8db-dca0-4c1e-9f29-d080185ce155', 'DAF7A6', 'Georgia');
INSERT INTO "theme" ("id", "color", "font") VALUES ('633bdc25-0ad7-43a1-b0c0-d20e55b22b31', '581845', 'Arial');
INSERT INTO "theme" ("id", "color", "font") VALUES ('f7d78234-5ddc-4404-9e24-5a5a56c76e5c', '900C3F', 'Arial');
INSERT INTO "theme" ("id", "color", "font") VALUES ('e99704f6-1137-4e7f-b0c4-629d01f30870', '900C3F', 'Times New Roman');
INSERT INTO "theme" ("id", "color", "font") VALUES ('799bb607-8a6a-4cf1-9738-4389f4238cef', 'DAF7A6', 'Georgia');
INSERT INTO "theme" ("id", "color", "font") VALUES ('c0accbd9-ab99-4db1-a881-4fbf9213954e', '900C3F', 'Times New Roman');
INSERT INTO "theme" ("id", "color", "font") VALUES ('c2196ed7-9ec9-4381-aed9-8538964cb5fc', 'DAF7A6', 'Courier New');
INSERT INTO "theme" ("id", "color", "font") VALUES ('9cf8ae9d-cd6b-47e2-afa4-4c05221bea12', '581845', 'Times New Roman');
INSERT INTO "theme" ("id", "color", "font") VALUES ('8bd82f1a-c647-48b8-8666-b2081972bc32', 'FF5733', 'Times New Roman');
INSERT INTO "theme" ("id", "color", "font") VALUES ('0e36a2d0-e841-4f3f-a425-cd11812d5ec7', '581845', 'Times New Roman');

INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('9760f749-09be-42a3-b87e-d6ebb9356d01', 'Customer Satisfaction Survey', 'c89cc3c4-d684-4bfa-957a-59eecfcac262', 'c2196ed7-9ec9-4381-aed9-8538964cb5fc');
INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('2dfcf4d1-b8e4-4dea-8d55-c7171e94648a', 'Employee Engagement Feedback', '290ecf92-526f-4148-9d22-0629b07da427', 'c0accbd9-ab99-4db1-a881-4fbf9213954e');
INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('833be9d7-4799-4711-ada3-e6848fb83f11', 'Employee Engagement Feedback', 'c89cc3c4-d684-4bfa-957a-59eecfcac262', '8bd82f1a-c647-48b8-8666-b2081972bc32');
INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('085fd8bf-0cc6-47f1-8ea4-bf94950bcf34', 'Website Usability Evaluation', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'c0accbd9-ab99-4db1-a881-4fbf9213954e');
INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('409c13c6-c542-4ee0-be3b-05e1cd40e697', 'Customer Satisfaction Survey', 'dd1cb770-bac2-40ab-ba79-e0832ead35f6', '0e36a2d0-e841-4f3f-a425-cd11812d5ec7');
INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('0718ef49-e460-413e-990b-6a374a4df1a9', 'Product Launch Feedback', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'e99704f6-1137-4e7f-b0c4-629d01f30870');
INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('9a02a8de-dba6-4790-8f84-b2b1e22ae5cc', 'Event Satisfaction Survey', '20f0a111-13bc-4b6a-8095-4aa7884ca7c6', '799bb607-8a6a-4cf1-9738-4389f4238cef');
INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('01037047-66d7-44ff-b281-58db6fbcf38d', 'Website Usability Evaluation', 'ab14dea4-ab36-4820-8616-fc78fd7fb7aa', 'c2196ed7-9ec9-4381-aed9-8538964cb5fc');
INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('0c34bb51-e58a-4cc2-b6b2-33bc9e597cbe', 'Employee Engagement Feedback', '20f0a111-13bc-4b6a-8095-4aa7884ca7c6', '799bb607-8a6a-4cf1-9738-4389f4238cef');
INSERT INTO "survey" ("id", "title", "userId", "themeId") VALUES ('f921ee9d-66e7-4e9a-895b-7e465c378686', 'Customer Satisfaction Survey', '37596b0f-0c47-4a97-b51c-1b2b2e21f07f', '9cf8ae9d-cd6b-47e2-afa4-4c05221bea12');

INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('2548f170-3cad-45f5-8060-dcda4b8a76f6', 'httpssurveyapp.coms1a2b3c', '01037047-66d7-44ff-b281-58db6fbcf38d');
INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('69824558-104a-4cb1-a05c-50f2b983e626', 'httpssurveyapp.coms4d5e6f', '2dfcf4d1-b8e4-4dea-8d55-c7171e94648a');
INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('857947a6-3ebc-47bf-a942-615895b22b03', 'httpssurveyapp.coms4d5e6f', '9760f749-09be-42a3-b87e-d6ebb9356d01');
INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('be9bc76f-3652-43ba-b9a1-c425a0e5702c', 'httpssurveyapp.comsm3n4o5', '01037047-66d7-44ff-b281-58db6fbcf38d');
INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('edd98de5-56c2-4972-9ee5-79372a8b4b76', 'httpssurveyapp.coms4d5e6f', '409c13c6-c542-4ee0-be3b-05e1cd40e697');
INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('81872be3-7ccd-4569-bad1-941fffd33ce6', 'httpssurveyapp.comsm3n4o5', '01037047-66d7-44ff-b281-58db6fbcf38d');
INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('819deaeb-59ad-4128-b502-d3c42f43136a', 'httpssurveyapp.comsj0k1l2', '2dfcf4d1-b8e4-4dea-8d55-c7171e94648a');
INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('25846d6d-f475-41b3-92df-fdf462bf4d05', 'httpssurveyapp.coms1a2b3c', '2dfcf4d1-b8e4-4dea-8d55-c7171e94648a');
INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('cc544b42-8a02-43fd-94f5-be7abe316130', 'httpssurveyapp.comsm3n4o5', '833be9d7-4799-4711-ada3-e6848fb83f11');
INSERT INTO "participant" ("id", "uniqueLink", "surveyId") VALUES ('ebf0d01f-c7b8-4e74-9359-80cf480e72f2', 'httpssurveyapp.comsm3n4o5', '01037047-66d7-44ff-b281-58db6fbcf38d');

INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('a566c3a5-6293-452f-aa28-af9d892dca02', 'Do you own a pet If yes what kind', 'openended', 'If Q5 is Cat show Q6', '085fd8bf-0cc6-47f1-8ea4-bf94950bcf34');
INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('b8d171ea-eafa-446b-8a36-27af955a0736', 'What genre of movies do you prefer', 'openended', 'Show Q3 if Q2 is Comedy', 'f921ee9d-66e7-4e9a-895b-7e465c378686');
INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('214f37ab-8698-49a5-ad70-2600cda46d2f', 'How often do you exercise each week', 'multiplechoice', 'If Q5 is Cat show Q6', 'f921ee9d-66e7-4e9a-895b-7e465c378686');
INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('be7fd3a5-09cb-4b02-a646-865d91513997', 'Describe your ideal vacation.', 'multiplechoice', 'No condition', '0c34bb51-e58a-4cc2-b6b2-33bc9e597cbe');
INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('d5b0a81c-ca6f-4b03-a7fa-e5870706e072', 'Do you own a pet If yes what kind', 'openended', 'No condition', '01037047-66d7-44ff-b281-58db6fbcf38d');
INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('7f8d1ee4-66dc-4e81-ad70-70c0c53a3b18', 'What genre of movies do you prefer', 'multiplechoice', 'Show Q3 if Q2 is Comedy', 'f921ee9d-66e7-4e9a-895b-7e465c378686');
INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('487ffce0-bef4-440d-a113-6521fe3f700e', 'What genre of movies do you prefer', 'multiplechoice', 'If Q5 is Cat show Q6', '9a02a8de-dba6-4790-8f84-b2b1e22ae5cc');
INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('2cd675a3-e269-445e-b791-e7be4aa3d7a7', 'What genre of movies do you prefer', 'multiplechoice', 'If Q1 is Yes show Q2', '9a02a8de-dba6-4790-8f84-b2b1e22ae5cc');
INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('8cb329a6-fa85-4877-9634-071eb8ed8a87', 'How often do you exercise each week', 'openended', 'Show Q3 if Q2 is Comedy', '2dfcf4d1-b8e4-4dea-8d55-c7171e94648a');
INSERT INTO "question" ("id", "text", "type", "conditionalLogic", "surveyId") VALUES ('b0576453-8753-4743-a5ec-14025d967b54', 'Describe your ideal vacation.', 'multiplechoice', 'Show Q3 if Q2 is Comedy', 'f921ee9d-66e7-4e9a-895b-7e465c378686');

INSERT INTO "option" ("id", "text", "questionId") VALUES ('99e72cc7-aaa1-4020-95ba-ed4e27ac1b46', 'Prefer not to say', '2cd675a3-e269-445e-b791-e7be4aa3d7a7');
INSERT INTO "option" ("id", "text", "questionId") VALUES ('3554c0fe-f3f9-4bb6-9c23-e93e2d59732d', 'None of the above', '8cb329a6-fa85-4877-9634-071eb8ed8a87');
INSERT INTO "option" ("id", "text", "questionId") VALUES ('6b8c5d15-892f-4de0-be43-67a0aa3131ec', 'Option B', 'b0576453-8753-4743-a5ec-14025d967b54');
INSERT INTO "option" ("id", "text", "questionId") VALUES ('54f31fe7-6aa8-4665-9580-574486b6079c', 'Option B', 'b0576453-8753-4743-a5ec-14025d967b54');
INSERT INTO "option" ("id", "text", "questionId") VALUES ('ac4bf923-9259-442d-adab-bf44724af22f', 'Option A', '487ffce0-bef4-440d-a113-6521fe3f700e');
INSERT INTO "option" ("id", "text", "questionId") VALUES ('80a158b6-0d9e-43bd-80bb-a3feb94864a0', 'Option B', 'b0576453-8753-4743-a5ec-14025d967b54');
INSERT INTO "option" ("id", "text", "questionId") VALUES ('19697524-cda9-4206-93f2-41f64d202326', 'All of the above', 'd5b0a81c-ca6f-4b03-a7fa-e5870706e072');
INSERT INTO "option" ("id", "text", "questionId") VALUES ('24d26bd4-9f94-4461-bdf2-bba4b41abd2f', 'Option A', 'a566c3a5-6293-452f-aa28-af9d892dca02');
INSERT INTO "option" ("id", "text", "questionId") VALUES ('8e90bb29-1d57-4898-8421-75a452c48a91', 'None of the above', 'b8d171ea-eafa-446b-8a36-27af955a0736');
INSERT INTO "option" ("id", "text", "questionId") VALUES ('54e265cd-c5df-40b2-bce7-fa2a9b9b8828', 'Option A', '2cd675a3-e269-445e-b791-e7be4aa3d7a7');

INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('6fd31651-080c-4736-894e-b1f0f88f08e8', '2dfcf4d1-b8e4-4dea-8d55-c7171e94648a', '2548f170-3cad-45f5-8060-dcda4b8a76f6');
INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('f9a07929-7855-4512-9366-2d14a6914cee', '833be9d7-4799-4711-ada3-e6848fb83f11', 'ebf0d01f-c7b8-4e74-9359-80cf480e72f2');
INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('ce062632-f76c-4d9d-addf-4d587e499773', '085fd8bf-0cc6-47f1-8ea4-bf94950bcf34', 'be9bc76f-3652-43ba-b9a1-c425a0e5702c');
INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('ba75cc1c-8ef3-46d9-9d45-d965943840e1', '0718ef49-e460-413e-990b-6a374a4df1a9', 'ebf0d01f-c7b8-4e74-9359-80cf480e72f2');
INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('b63ce472-a3b4-48f1-97f0-f55bb280df6d', '2dfcf4d1-b8e4-4dea-8d55-c7171e94648a', 'be9bc76f-3652-43ba-b9a1-c425a0e5702c');
INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('ca9abc38-9407-4c58-8b3a-ffeecff686d3', '409c13c6-c542-4ee0-be3b-05e1cd40e697', '819deaeb-59ad-4128-b502-d3c42f43136a');
INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('995975ca-5a29-4aba-b710-a6bc72e8e876', '9760f749-09be-42a3-b87e-d6ebb9356d01', 'be9bc76f-3652-43ba-b9a1-c425a0e5702c');
INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('ab12500d-4fff-4836-9388-525ca65bf033', '833be9d7-4799-4711-ada3-e6848fb83f11', '81872be3-7ccd-4569-bad1-941fffd33ce6');
INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('7699d015-c8ac-4ba1-9e24-92c323601d6c', '409c13c6-c542-4ee0-be3b-05e1cd40e697', '25846d6d-f475-41b3-92df-fdf462bf4d05');
INSERT INTO "response" ("id", "surveyId", "participantId") VALUES ('f9d78de9-e950-409d-9dd2-3566915002cb', '409c13c6-c542-4ee0-be3b-05e1cd40e697', '25846d6d-f475-41b3-92df-fdf462bf4d05');

INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('847914aa-30ab-458f-94e2-9b4814946b64', 'My favorite color is blue.', 'ca9abc38-9407-4c58-8b3a-ffeecff686d3', '8cb329a6-fa85-4877-9634-071eb8ed8a87', '99e72cc7-aaa1-4020-95ba-ed4e27ac1b46');
INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('2112919c-69de-4e01-9de6-48b79f9a1643', 'No I do not agree.', '995975ca-5a29-4aba-b710-a6bc72e8e876', '487ffce0-bef4-440d-a113-6521fe3f700e', '8e90bb29-1d57-4898-8421-75a452c48a91');
INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('44bb77b2-d263-49c9-80e6-5ce51a941192', 'Yes I completely agree with the statement.', 'ca9abc38-9407-4c58-8b3a-ffeecff686d3', '2cd675a3-e269-445e-b791-e7be4aa3d7a7', '6b8c5d15-892f-4de0-be43-67a0aa3131ec');
INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('283f54c3-3dc5-4cab-bd4f-c7f8b7719f65', 'Yes I completely agree with the statement.', 'ab12500d-4fff-4836-9388-525ca65bf033', 'b8d171ea-eafa-446b-8a36-27af955a0736', '19697524-cda9-4206-93f2-41f64d202326');
INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('540b784a-8154-46d2-b732-69df76e94933', 'I prefer not to answer this question.', 'ba75cc1c-8ef3-46d9-9d45-d965943840e1', '8cb329a6-fa85-4877-9634-071eb8ed8a87', '3554c0fe-f3f9-4bb6-9c23-e93e2d59732d');
INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('52b50b5e-aa48-4879-9a3f-f50292e78b1c', 'I am unsure about this topic.', 'ab12500d-4fff-4836-9388-525ca65bf033', 'a566c3a5-6293-452f-aa28-af9d892dca02', '54e265cd-c5df-40b2-bce7-fa2a9b9b8828');
INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('0b22bfc3-e320-451e-a1da-9a3ddc8ffd72', 'I prefer not to answer this question.', 'f9a07929-7855-4512-9366-2d14a6914cee', '8cb329a6-fa85-4877-9634-071eb8ed8a87', 'ac4bf923-9259-442d-adab-bf44724af22f');
INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('25e964cb-3ff4-4072-87fa-c4c2c577be0a', 'My favorite color is blue.', 'f9a07929-7855-4512-9366-2d14a6914cee', '8cb329a6-fa85-4877-9634-071eb8ed8a87', '54e265cd-c5df-40b2-bce7-fa2a9b9b8828');
INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('00461770-ef61-412f-b78d-4a751dcc1a91', 'I am unsure about this topic.', 'f9d78de9-e950-409d-9dd2-3566915002cb', 'be7fd3a5-09cb-4b02-a646-865d91513997', '24d26bd4-9f94-4461-bdf2-bba4b41abd2f');
INSERT INTO "answer" ("id", "text", "responseId", "questionId", "optionId") VALUES ('b6b6679d-e657-4135-82f3-f9c063f92d91', 'Yes I completely agree with the statement.', '995975ca-5a29-4aba-b710-a6bc72e8e876', '7f8d1ee4-66dc-4e81-ad70-70c0c53a3b18', '54e265cd-c5df-40b2-bce7-fa2a9b9b8828');

INSERT INTO "comment" ("id", "text", "responseId") VALUES ('234cccb6-9704-445b-bd09-2e53703e4680', 'Very engaging questions looking forward to more surveys like this.', 'f9a07929-7855-4512-9366-2d14a6914cee');
INSERT INTO "comment" ("id", "text", "responseId") VALUES ('c56f313b-0bed-437a-a917-1bb0e16e2acd', 'The survey was too long consider making it shorter.', 'ce062632-f76c-4d9d-addf-4d587e499773');
INSERT INTO "comment" ("id", "text", "responseId") VALUES ('22c2cb91-d2b4-4b91-9c13-f3ecbcee9306', 'Some questions were a bit confusing could use clearer wording.', '6fd31651-080c-4736-894e-b1f0f88f08e8');
INSERT INTO "comment" ("id", "text", "responseId") VALUES ('22d118c9-c81f-4364-a7b2-139ac9f74bff', 'Great survey very intuitive', 'f9a07929-7855-4512-9366-2d14a6914cee');
INSERT INTO "comment" ("id", "text", "responseId") VALUES ('86697ee0-4da6-4059-ac77-b6531ed3848d', 'Great survey very intuitive', 'b63ce472-a3b4-48f1-97f0-f55bb280df6d');
INSERT INTO "comment" ("id", "text", "responseId") VALUES ('0ff76377-e37a-42a9-8e82-05ac27158a89', 'The survey was too long consider making it shorter.', 'ca9abc38-9407-4c58-8b3a-ffeecff686d3');
INSERT INTO "comment" ("id", "text", "responseId") VALUES ('bb25cae8-dde6-4f36-a8f0-c2d9b964b2e7', 'Great survey very intuitive', 'ab12500d-4fff-4836-9388-525ca65bf033');
INSERT INTO "comment" ("id", "text", "responseId") VALUES ('9e22af09-8bf6-4482-bb4e-d185cbf0486e', 'Some questions were a bit confusing could use clearer wording.', 'ca9abc38-9407-4c58-8b3a-ffeecff686d3');
INSERT INTO "comment" ("id", "text", "responseId") VALUES ('af4b8ae4-ffc3-4348-8fab-c8bc3d7c6b86', 'Very engaging questions looking forward to more surveys like this.', 'f9d78de9-e950-409d-9dd2-3566915002cb');
INSERT INTO "comment" ("id", "text", "responseId") VALUES ('0994ff25-33d7-447f-9f90-b1ed8440537a', 'The survey was too long consider making it shorter.', 'f9a07929-7855-4512-9366-2d14a6914cee');

INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('f1a6f57f-fa88-4ddb-a6c4-cf7d08e09632', '01037047-66d7-44ff-b281-58db6fbcf38d', 'ebf0d01f-c7b8-4e74-9359-80cf480e72f2');
INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('1bdce63f-1f4d-4904-af45-cd945dfdf786', '9760f749-09be-42a3-b87e-d6ebb9356d01', 'edd98de5-56c2-4972-9ee5-79372a8b4b76');
INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('ec9a7fc3-f75f-4bf7-9e7d-a449966f6fc5', '833be9d7-4799-4711-ada3-e6848fb83f11', 'be9bc76f-3652-43ba-b9a1-c425a0e5702c');
INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('7341dd1e-c8e1-4a6c-ab79-7d8c94ef0a48', '833be9d7-4799-4711-ada3-e6848fb83f11', '69824558-104a-4cb1-a05c-50f2b983e626');
INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('f218f3ad-0932-4153-a107-58aff96dbf8e', '0718ef49-e460-413e-990b-6a374a4df1a9', 'ebf0d01f-c7b8-4e74-9359-80cf480e72f2');
INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('bbf5485c-31d6-41d9-8f1c-a208a56ad4ba', '9a02a8de-dba6-4790-8f84-b2b1e22ae5cc', '857947a6-3ebc-47bf-a942-615895b22b03');
INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('1dd5c873-6d5e-470f-9141-f3164340ef26', '833be9d7-4799-4711-ada3-e6848fb83f11', '857947a6-3ebc-47bf-a942-615895b22b03');
INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('7c125816-dc53-4c83-934f-634958fdc3b4', '085fd8bf-0cc6-47f1-8ea4-bf94950bcf34', 'be9bc76f-3652-43ba-b9a1-c425a0e5702c');
INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('3baf4d09-ad92-4d9f-8158-7f756f363489', 'f921ee9d-66e7-4e9a-895b-7e465c378686', 'be9bc76f-3652-43ba-b9a1-c425a0e5702c');
INSERT INTO "survey_access" ("id", "surveyId", "participantId") VALUES ('2237432c-bf46-4cf5-9202-c02c1ad7738f', '833be9d7-4799-4711-ada3-e6848fb83f11', '69824558-104a-4cb1-a05c-50f2b983e626');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
