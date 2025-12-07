This repository has the code used for creating the web app used for demonstrating the project created on the repository https://github.com/luizamarnet/bigFive-personalityTest, which uses a factor analysis model for running a personality test.

Bellow is the step-by-step for creating a similar web app.

We use Google Cloud and firebase for creating the web app, which has a machine learning model running on the beckend for analysing the user answers.

### Before Starting

Make sure you have:

* A Google Cloud account
* Google Cloud SDK installed on your PC
   * You can test if you already have Google Cloud SDK installed running the following code on CMD or Powershell:
       gcloud --version
   * If it is not already installed, go to https://docs.cloud.google.com/sdk/docs/install-sdk?hl=pt-br and get it
* Docker installed on your PC
   * You can test if you already have Docker installed running the following code on CMD or Powershell:
      docker --version
   * If it is not already installed, go to https://www.docker.com/get-started and get it installed


### Put your web application online 

On the CMD or Powershell
1. Log in to Google Cloud running:
   ```cmd
   gcloud auth login
   ```
2. Create your project on Google Cloud running:
   ```cmd
   gcloud projects create <PROJECT_ID> --name="<PROJECT NAME>"
   ```
   * Observe that the PROJECT_ID needs to be unic in the entire world, and you may need to add numbers at the end to achieve that, for example <PROJECT_ID> = big5-01
   * Alternativelly, you can create a new project direct at https://console.cloud.google.com/. Open the link, and click on the current project name on the top left, to the right of Google Cloud logo. A small window with all your projects names and IDs will open, there you can click on "New project" and choose your project name. After that, check for the project ID on the same small window which has all your projects names.
   * After creating the project, habilitate the billing for this project on https://console.cloud.google.com/billing/projects
2. Configure your project as the current project running:
   ```cmd
   gcloud config set project YOUR_PROJECT_ID
   ```
3. Grant necessary permissions running (change YOUR_USER_EMAIL and YOUR_PROJECT_ID by your own values):
   ```cmd
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
    --member=user:YOUR_USER_EMAIL \
    --role=roles/storage.admin
   ```
   ```cmd
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID ^
   --member=user:YOUR_USER_EMAIL ^
   --role=roles/cloudbuild.builds.editor
   ```
   ```cmd
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID ^
   --member=user:YOUR_USER_EMAIL ^
   --role=roles/iam.serviceAccountUser
   ```
   ```cmd
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID ^
   --member=user:YOUR_USER_EMAIL ^
   --role=roles/artifactregistry.writer
   ```

   <!--```cmd
   gcloud services enable cloudbuild.googleapis.com
   ```  -->

 <!--gcloud projects describe bigfive-api-rev1-001 --format="value(projectNumber)"


  gcloud projects add-iam-policy-binding bigfive-api-rev1-001 ^
  --member=serviceAccount:<PROJECT_NUMBER>@cloudbuild.gserviceaccount.com ^
  --role=roles/storage.admin -->




<!------------------------DELETE
    gcloud projects add-iam-policy-binding bigfive-api-rev1-001 --member=user:luizamarnet@gmail.com --role=roles/serviceusage.serviceUsageAdmin

    gcloud projects add-iam-policy-binding bigfive-api-rev1-001 ^
  --member=serviceAccount:169560881354@cloudbuild.gserviceaccount.com ^
  --role=roles/storage.admin
------------------------------------ -->

3. Build an image and send to Google Cloud running the following command from __functions/__ folder (change SEU_PROJECT_ID and your_image_name by your own values):
   ```cmd
   gcloud builds submit --tag gcr.io/SEU_PROJECT_ID/your_image_name
   ```
4. Deploy you project on Google Cloud running (change SEU_PROJECT_ID and your_image_name by your own values):
```cmd
gcloud run deploy your_image_name \
  --image gcr.io/SEU_PROJECT_ID/your_image_name \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

The last step will give a URL on the format: https://bigfive-api.us-central1.run.app.
Take this URL and repace  <YOUR_MODEL_URL> by this URL on files __script.js__ on forlder __en/__ and __pt/__

Now:
1. Go to https://console.firebase.google.com and create a new project.
2. From insede the project root folder, where the file firebase.json is, run the following command on CMD or powershell:
   ```cmd
   firebase use --add
   ```
   * When asked __Which project do you want to add?__, choose the project that you have just created
   * Choose the alias, for example __test__ or __default__
3. ```cmd
    firebase init hosting
    ```
    * When you are asked __What do you want to use as your public directory?__, choose __public__
    * When you are asked __Configure as a single-page app (rewrite all urls to /index.html)?__, choose __n__
    * When you are asked __Set up automatic builds and deploys with GitHub? (Y/n)__, choose __Y__ if you use Github and want automatic build and deploy everytime that you make a new Github push from this repository
    * When asked __File public/index.html already exists. Overwrite?__, choose __N__
    * When asked __For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository)__, choose the respective repository that you are connecting to this project. Attempt to the format user/repository
       * Here, you will probably receive an error. Re-run step 3 from the beggining, and it will probablyy work this time
    * When asked __Set up the workflow to run a build script before every deploy? __, choose __n__ 
    * When asked __Set up automatic deployment to your site's live channel when a PR is merged?__, choose __n__ if you do not want the live website to be updated automatically
4. ```cmd
    firebase deploy --only hosting
    ```

The last step gives you a Hosting URL. Clack and share this URL for using your web app and be happy! 🙂 

If you arrived to this point, congrats! You did it! 


