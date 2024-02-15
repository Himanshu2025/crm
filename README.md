# crm

Building a backend of a CRM application for a complaint redressal system
	-  Building REST API's

## Backend : 
- Using Express framework ( It doesn't have a fixed structure )

The given backend should be built in three different layers : 
 1. Routes  - ( Receptionist )
 2.  Controller - ( Waiter )
 3. Model - ( )
 4. Config Folder ( Properties whose values can change )
 5. utils ( Reusable files )

### CRM application : 
- CRM application is a software solution which helps the company to achieve following things :
	- Understand the user feedback 
	- Market new products 
	- Addressing issues of customers 
- Vision : 
	-  As a customer I should be able to raise a complaint in the form of tickets 
	- Life cycle management of the ticket 
- Entities: 
	- User 
	- Customer 
	- Engineer 
	- Admin 
	- Ticket 
-  From POV of customer
	- Ticket 
		- Create 
		- Update 
		- Close
	-  Register and Login 
	- History of tickets created by customer 
	- Ability to add filters 

| Path Param | Query Param |
| --- | --- |
| Pinpoint a single result  | Filtering the result  |
- From the Perspective of engineers 
	-  Login : Only when the engineer is approved he/she should be allowed to login 
		- It will be approved by Admin 
	- As soon as a customer raises a ticket, an engineer should get assigned to it. 
	- Engineer should be able to see the list of tickets assigned, update the ticket and create the ticket 
- From the perspective of Admin: 
	-  Do all the things which a customer can do 
	- Do all the things which an Engineer can do 
	- Admin can reject/ approve an engineer 
	- Admin can re-assign an Engineer to the ticket 
	- Admin is the super user 


### Tech stack 
- node.js 
- Express 
- MongoDB  | Mongoose 
- REST APIs


