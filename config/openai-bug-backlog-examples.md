# Останні 20 багів (Azure DevOps) — приклади оформлення

_Джерело: WIQL `WorkItemType = Bug` ORDER BY `ChangedDate` DESC, top 20. Орг: `projectdisco`, проєкт: `Digital-Services`. HTML полів зведено до plain text._

## Bug #20614: [Scoutables] List of Scoutables is not fully visible (in some cases is not visible at all)

- **URL:** [20614](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20614)
- **State:** Resolved
- **Area:** Digital-Services
- **AssignedTo:** Paweł Niedzin
- **Created:** 2026-03-27T09:55:17.18Z
- **Changed:** 2026-03-31T16:13:44.167Z

### Repro Steps

Environment:  dev Preconditions:User has Admin + Allowed Country Advisor roles -> to see footer  User logged in to Koppert One Visit Report list is opened  Visit Report 1 has cultivars on Location 1Steps:   Click on Create visit report button  Select Location 1 Scroll down to Cultivars  Click on Search icon for scoutables  Pay attention to the view   Actual result: List of Scoutables is not fully visible (in some cases is not visible at all) 

 Expected result: should be visible

---

## Bug #20714: NSO order is displayed on Overview

- **URL:** [20714](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20714)
- **State:** New
- **Area:** Digital-Services
- **Tags:** FE; Overview; PBI; Web
- **AssignedTo:** Ivan Kornyk
- **Created:** 2026-03-31T09:37:26.757Z
- **Changed:** 2026-03-31T15:54:26.023Z

### Repro Steps

Env: dev     Preconditions:     Kopppert.one is opened as Admin Overview  page is opened  Planner page is opened 
 Enterprise is C.J. Klep  Steps: Select 10 products on Planner  One product with lead time Add qty for 10 products  Click on Order button  Refresh Overview Click on Order box Click on Open button  Pay attention to the order ID  Actual result:  NSO order is displayed on Overview  Open button is available for NSO     Expected result: should NOT be displayed (Open button as on Planner or Order at all, need to clarify)

---

## Bug #20082: User can not create Location due to 502 related to State and Country fields

- **URL:** [20082](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20082)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** BE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-04T15:32:02.547Z
- **Changed:** 2026-03-31T14:45:55.627Z

### Repro Steps

Env: dev  Preconditions:     Kopppert.one is opened as Admin Admin -> Subsidiaries page is opened 
  Steps: Click on Organization -> Locations page  Click on Create Location button  Enter inf in all fields -> Click on Save Pay attention to the page  Actual result: User can not create Location due to 502 related to State and Country fields  Expected result: Location should be created (or Error should be handled) TBD

---

## Bug #20716: Tooltip is cut off for small screen

- **URL:** [20716](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20716)
- **State:** New
- **Area:** Digital-Services
- **Tags:** FE; Overview; PBI; Web
- **AssignedTo:** Ivan Kornyk
- **Created:** 2026-03-31T09:57:45.763Z
- **Changed:** 2026-03-31T11:24:15.55Z

### Repro Steps

Env: dev     Preconditions:     Kopppert.one is opened as Admin Overview  page is opened  Enterprise is C.J. Klep User has some order   Steps: Decrease the screen  Click on order box Pay attention to the Tooltip
NOTE: the same for Planner  Actual result: Tooltip is cut off for small screen   Expected result: Tooltip should NOT cut off for small screen

---

## Bug #20712: ʼGo to Planner' option is missed

- **URL:** [20712](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20712)
- **State:** Committed
- **Area:** Digital-Services
- **Tags:** FE; Overview; PBI; Web
- **AssignedTo:** Ivan Kornyk
- **Created:** 2026-03-31T08:58:54.673Z
- **Changed:** 2026-03-31T11:23:28.487Z

### Repro Steps

Env: dev    Preconditions:     Kopppert.one is opened as Admin Overview  page is opened  Enterprise is C.J. Klep  Steps: Pay attention to the ʼGo to Planner' option  Actual result: ʼGo to Planner' option is missed   Expected result: should be and redirect to the Planner

---

## Bug #19962: Double quotes getting removed from order reference

- **URL:** [19962](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19962)
- **State:** Removed
- **Area:** Digital-Services
- **Created:** 2026-03-01T00:26:53.28Z
- **Changed:** 2026-03-31T10:44:01.72Z

### Repro Steps

Create order with double quotes in Order reference field - "
 Save it
 Open it, observe

---

## Bug #19628: Timer does not respect query parameter

- **URL:** [19628](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19628)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Automation; FE; Planner; Web
- **Created:** 2026-02-18T22:51:42.753Z
- **Changed:** 2026-03-31T10:43:45.13Z

### Repro Steps

Preconditions:
- User logged in to Koppert One - Has role with access to "Orders" and additional role "Orderer" 
 - Has linked enterprise with data 
 - Planner page is opened

Setup the timer so, it reaches it's deadline in 1 minute (can use in the URL parameter "?hour=X?minutes=Y" to setup).

Expected: The timer is shown with 1 minute left until the deadline).
Actual: timer shows some weird time, sometimes time till midnight, sometimes more, but not what is expected

---

## Bug #20352: [Sign up] User is logged out from app after signing up -> putting app to background -> opening app

- **URL:** [20352](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20352)
- **State:** Committed
- **Area:** Digital-Services
- **Tags:** Mobile; Regression; Self-sign up
- **Created:** 2026-03-12T15:00:10.343Z
- **Changed:** 2026-03-31T09:30:01.04Z

### Repro Steps

STR:
 Open mobile app -> Create account Fill in required fields Go to email -> check invitation Set up a password Check that user is navigated to mobile app Fill in the rest of the fields that appear in mobile app Check Settings, Side effects screens Close the app (not cold kill) Open app again  Actual result: app is opened, user is logged out 
 Expected result: user is not logged out from app and continues using it

---

## Bug #20442: Order list: Translations are not applied for the renamed section, page and in order emails

- **URL:** [20442](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20442)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; PBI; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-23T09:33:33.977Z
- **Changed:** 2026-03-31T09:29:42.463Z

### Repro Steps

Env: dev 
 Preconditions: User has access to Order module User is logged in to Koppert.One User has enabled emails notifications   
 Steps: Change the language under your profile to any language other than English Open Order > Order list Verify that section in the side bar and page title are translated (ex Orders, now Order list) -> see Actual result Create a new order or update any existing  Verify received email related to orders and verify translations  Actual result after steps steps 3, 5 -> Order list translations are not applied

 
 Expected result: Translations for Order list should be shown, we see the previous translations for 'Orders', now this page and section are Order list

---

## Bug #20713: There is date differences for the same order (NL6-SO00252834) on Orders List and Orders Details

- **URL:** [20713](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20713)
- **State:** Committed
- **Area:** Digital-Services
- **Tags:** BE; Order List; Orders; Planner; Web
- **AssignedTo:** Mykola Pavlyk
- **Created:** 2026-03-31T09:12:27.067Z
- **Changed:** 2026-03-31T09:20:17.87Z

### Repro Steps

Env: dev     Preconditions:     Kopppert.one is opened as Admin Orders list is displayed Orders details is displayed for NL6-SO00252834
 Enterprise is C.J. Klep -> Location C.J. Klep -  Steps: Pay attention to the date for order NL6-SO00252834  Actual result:  There is date differences for the same order (NL6-SO00252834) on Orders List and Orders Details 30 march on details and 1 april on orders list   
   Expected result: The date should be the same

---

## Bug #18605: Fields do not decrease as the page size decreases

- **URL:** [18605](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18605)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Organization; Regression; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-30T12:11:54.92Z
- **Changed:** 2026-03-31T09:13:34.723Z

### Repro Steps

Preconditions: User has Admin + Allowed Country Advisor roles -> to see footer  User logged in to Koppert One Organization is displayed    Steps: Click on View Decrease the page Pay attention to the Edit button  Click on Edit Pay attention to the Email and Name fields   Actual result:  Edit button overlaps fields after page size decreases Email and Name fields do not decrease as the page size decreases
   
 
 Expected result:  Edit button should NOT overlap fields after page size decreases Email and Name fields should be decreased as the page size decreases  
 Preconditions: User has Admin + Allowed Country Advisor roles -> to see footer  User logged in to Koppert One Visit reports is displayed    Steps: Click on View for VR + observations Decrease the page Pay attention to the fields   Actual result: Fields do not decrease as the page size decreases   Expected result: Fields should be decreased as the page size decreases

---

## Bug #18046: Some drop-downs are closed some of them not after clicking inside after activation search icon

- **URL:** [18046](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18046)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Admin; FE; Organization; Planner; Regression; Visit report; Visit reports; Web
- **Created:** 2025-12-01T10:48:55.2Z
- **Changed:** 2026-03-31T09:11:51.75Z

### Repro Steps

Environment: stage     Preconditions:Koppert.One is opened Planner is displayed User has linked Enterprises with 10 locations   Steps: Click on Search icon in Enterprise drop-down  Click on the middle of drop-down  Click on the middle of drop-down again -> List of Enterprises continue displaying 
 Click on Search icon in Location drop-down  Click on the middle of drop-down  Click on the middle of drop-down again -> List of Locations close
NOTE: the same on Visit REports, Admin, Orfanization    Actual result: Some drop-dows are closed some of them no after clicking inside after activation search icon  Expected result: Should be consistently (TBD)

---

## Bug #20622: User doesn't have any role after SANA export has processed

- **URL:** [20622](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20622)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-27T14:38:59.077Z
- **Changed:** 2026-03-31T08:54:35.41Z

### Repro Steps

Pre conditions 
 User already exists in Koppert one with Basic role

STR: Add user's email to the SANA export file Process Sana export Check user details  Actual result: User doesn't have any role, but enterprise was assigned

User's Email:
lbilan+6@n-ix.com

Expected result: user has 2 roles : Orderer+Grower

---

## Bug #20515: [Team] 'Edit' button on enterprises is disabled when Admin/Local Admin views Grower + Orderer

- **URL:** [20515](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20515)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Team; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-26T08:17:15.223Z
- **Changed:** 2026-03-31T08:51:51.053Z

### Repro Steps

Env: dev
 
Preconditions:
Admin user with permissions to edit team members and enterprises exist Local Admin user with permissions to edit team members and enterprises exist Grower+Orderer user exists (with not koppert email)  Steps: Log in as Admin user Open Organizarion > Team Open details of Grower+Orderer 

 Navigate to 'Enterprises' tab  Actual result: 'Edit' button is disabled

Note: the same applies to Local Admin 

 
 Expected result: 'Edit' button is enabled

---

## Bug #20430: Search field disappears  after Visit Report deleting on Android

- **URL:** [20430](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20430)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-18T15:57:10.017Z
- **Changed:** 2026-03-31T07:56:06.517Z

### Repro Steps

Environment: pre-prod  Samsung Galaxy A35 5GSM-A356B/DSVersion 14  Preconditions:User has Admin + Allowed Country Advisor roles -> to see footer  User logged in to Koppert One User has Visit Report 1 Visit Reports list is displayedSteps:   Click on Visit Report 1 Click on trash icon -> Confirm  Pay attention to the Search field on Visit Reports list 

   Actual result: Search field disappears  after Visit Report deleting on Android  Expected result: Search field should be displayed

---

## Bug #20709: Value is wrapped across multiple lines

- **URL:** [20709](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20709)
- **State:** Committed
- **Area:** Digital-Services
- **Tags:** FE; Overview; PBI; Web
- **AssignedTo:** Ivan Kornyk
- **Created:** 2026-03-31T07:31:54.697Z
- **Changed:** 2026-03-31T07:34:05.483Z

### Repro Steps

Env: dev   Preconditions:     Kopppert.one is opened as Admin Overview  page is opened  Enterprise is C.J. Klep  Steps: Click on order box for Week 5 Pay attention to the Value  Actual result: Value is wrapped across multiple lines  Expected result: Value should be on one line

---

## Bug #20217: 500 appears during Location creation when select Ukraine country

- **URL:** [20217](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20217)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** BE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-11T12:41:31.9Z
- **Changed:** 2026-03-31T07:18:30.517Z

### Repro Steps

Env: dev     
CASE 1 Preconditions:     Kopppert.one is opened as Admin Set next e.g. settings to create location:Subsidiary: NoEnterprise: YesUser: Undefined
or 
Subsidiary: NoEnterprise: NoUser: Yes
 Organizations -> Location page is opened    Steps: Click on Create location  Enter some inf in some field Select Ukraine county CLick on Save button  Pay attention to the Location   Actual result: 500 appears during Location creation when select Ukraine country
  Expected result:  200 should be displayed and location should be created (TBD)

---

## Bug #17431: Order list is empty in the mobile app for some cases

- **URL:** [17431](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17431)
- **State:** Blocked
- **Area:** Digital-Services
- **Tags:** BE; Blocked by F&O; Cool; Mobile; Ordering - mobile; Orders; Regression
- **AssignedTo:** Tiffany Levens
- **Created:** 2025-11-03T15:25:36.31Z
- **Changed:** 2026-03-30T15:26:12.41Z

### Repro Steps

CASE 1
 STR:
 Open Orders in the mobile app Select '4Evergreen Terneuzen 1 B.V. ' enterprise Check the order list in the mobile app  Actual result: the list is empty in the mobile app, however there is data

Expected result: the orders are displayed in the list in the mobile app

CASE 2STR: Open Orders in the mobile app  Select 'AppHarvest' enterprise Select different locations Check the order #US1-SO00282996  Actual result: #US1-SO00282996 is displayed on different locations (please, look at the video)Expected result: #US1-SO00282996 related to one location

---

## Bug #19943: Leave guard appears for empty cultivar during creation and doesn't appear for created cultivar during deleting

- **URL:** [19943](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19943)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** FE; Regression; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-27T10:48:26.527Z
- **Changed:** 2026-03-30T13:57:15.17Z

### Repro Steps

Environment:  dev, stage  Preconditions:User has Admin  User logged in to Koppert One  Visit Report lists is displayed  Steps: Clic on any visit report -> Edit OR Create a visit report Click on Cultivar tab -> Don't enter anything Click on cross icon -> Leave guard appears Enter sone Cultivar name  Click on tick icon to save  Click on cross icon
 Pay attention to leave guard   Actual result:  leave guard appears for empty cultivar after clicking on cross icon leave guard doesn't appear for created cultivar after clicking on cross icon   Expected result:  
leave guard should NOT appear for empty or unsaved cultivar after clicking on cross icon leave guard should appear for created cultivar after clicking on cross icon

---

## Bug #20634: The banner is not hidden from Planner after end date if switching between enterprises of one subsidiary

- **URL:** [20634](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20634)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Planner; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-30T07:43:01.13Z
- **Changed:** 2026-03-30T13:55:10.78Z

### Repro Steps

STR:
 Set up the banner on Planner Open Planner in another tab -> check that banner is present there Change the end date so banner disappears Check that banner is still present on Planner Change the enterprise to another one that relates to the same subsidiary Check behaviour of banner  Actual result: the banner doesn't disappear
Expected result: the banner disappears from Planner when switching enterprise

---
