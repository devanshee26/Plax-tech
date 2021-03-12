This is backend developed using nodejs, expressjs and the database used is mongodb atlas.
In order run the backend, you should have : 
1.Google Cloud Platform Billing account and GCP Storage Bucket.
2.MongoDB Atlas Cluster.

1.Follow the link to set up the environment : (https://storage.googleapis.com/sdp-university-placement-portal/documentation.pdf)

2.  Go to the directory : UPP-Backend
    cd NODE_EXPRESS_MONGO_BACKEND/UPP-Backend
  
3. Copy the json file to this folder.
4. Update .env file value :
a. In MONGODB enter connection string of MongoDB Atlas Cluster.
b. In the KEYFILE enter name of JSON file.
c. Enter JWT_KEY of your choice.
d. In BUCKET enter name of bucket you have created in Google Cloud Storage
5. Run the following command to install the node modules in your local system:
   npm install
  
6. Run the following command to run the project :
   npm run index.js
    