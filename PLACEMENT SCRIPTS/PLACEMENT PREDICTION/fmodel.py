# -*- coding: utf-8 -*-
"""
Created on Wed Feb 17 20:14:02 2021

@author: Devanshee
"""

import pandas as pd

placement = pd.read_csv('E:\SEMESTER6\SDP\ASSETS\Placement_Data_Full_Class.csv')
placement_copy = placement.copy()
placement_copy['salary'].fillna(value=0, inplace=True)
placement_copy.drop(['sl_no','ssc_b','hsc_b'], axis = 1,inplace=True) 

Q1 = placement_copy['hsc_p'].quantile(0.25)
Q3 = placement_copy['hsc_p'].quantile(0.75)
IQR = Q3 - Q1    #IQR is interquartile range. 

filter = (placement_copy['hsc_p'] >= Q1 - 1.5 * IQR) & (placement_copy['hsc_p'] <= Q3 + 1.5 *IQR)
placement_filtered=placement_copy.loc[filter]


import warnings
warnings.filterwarnings('ignore')
from sklearn.preprocessing import LabelEncoder

# Make copy to avoid changing original data 
object_cols=['gender','workex','specialisation','status']     #placed or not : status

# Apply label encoder to each column with categorical data
label_encoder = LabelEncoder()
for col in object_cols:
    placement_filtered[col] = label_encoder.fit_transform(placement_filtered[col])

dummy_hsc_s=pd.get_dummies(placement_filtered['hsc_s'], prefix='dummy')
dummy_degree_t=pd.get_dummies(placement_filtered['degree_t'], prefix='dummy')
placement_coded = pd.concat([placement_filtered,dummy_hsc_s,dummy_degree_t],axis=1)
placement_coded.drop(['hsc_s','degree_t','salary'],axis=1, inplace=True)

X=placement_coded.drop(['status'],axis=1)
y=placement_coded.status

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y,train_size=0.8,random_state=1)

# predict if a student is placed or not.
from sklearn.linear_model import LogisticRegression
#from sklearn import metrics
logreg = LogisticRegression()
logreg.fit(X_train, y_train)
#y_pred = logreg.predict(X_test)
#print('Accuracy of logistic regression classifier on test set: {:.2f}'.format(logreg.score(X_test, y_test)))    




# Save your model
import joblib
joblib.dump(logreg, 'model.pkl')
print("Model dumped!")

# Load the model that you just saved
lr = joblib.load('model.pkl')

# Saving the data columns from training
model_columns = list(X_train.columns)
joblib.dump(model_columns, 'model_columns.pkl')
print("Models columns dumped!")


