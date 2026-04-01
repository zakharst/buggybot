# Azure DevOps bugs — backlog context for OpenAI

_Generated: 2026-04-01T09:47:12.591Z. WIQL: `WorkItemType = Bug` ORDER BY `System.ChangedDate` DESC, top 500. Org: `projectdisco`, project: `Digital-Services`. HTML fields converted to plain text._

---
## Bug #20714: NSO order is displayed on Overview

- **URL:** [20714](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20714)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** FE; Overview; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-31T09:37:26.757Z
- **Changed:** 2026-04-01T09:33:10.34Z

### Repro Steps

Env: dev 
 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Overview  page is opened  
• Planner page is opened 
 
• Enterprise is C.J. Klep 
 Steps: 
• Select 10 products on Planner  
• One product with lead time 
• Add qty for 10 products  
• Click on Order button  
• Refresh Overview 
• Click on Order box 
• Click on Open button  
• Pay attention to the order ID 
 Actual result:  
• NSO order is displayed on Overview  
• Open button is available for NSO  
  
 
Expected result: should NOT be displayed (Open button as on Planner or Order at all, need to clarify)

---

## Bug #20712: ʼGo to Planner' option is missed

- **URL:** [20712](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20712)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** FE; Overview; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-31T08:58:54.673Z
- **Changed:** 2026-04-01T09:17:01.173Z

### Repro Steps

Env: dev 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Overview  page is opened  
• Enterprise is C.J. Klep 
 Steps: 
• Pay attention to the ʼGo to Planner' option 
 Actual result: ʼGo to Planner' option is missed  
 
Expected result: should be and redirect to the Planner

---

## Bug #20709: Value is wrapped across multiple lines

- **URL:** [20709](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20709)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** FE; Overview; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-31T07:31:54.697Z
- **Changed:** 2026-04-01T09:16:59.09Z

### Repro Steps

Env: dev 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Overview  page is opened  
• Enterprise is C.J. Klep 
 Steps: 
• Click on order box for Week 5 
• Pay attention to the Value 
 Actual result: Value is wrapped across multiple lines 
 
Expected result: Value should be on one line

---

## Bug #20614: [Scoutables] List of Scoutables is not fully visible (in some cases is not visible at all)

- **URL:** [20614](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20614)
- **State:** Committed
- **Area:** Digital-Services
- **AssignedTo:** Paweł Niedzin
- **Created:** 2026-03-27T09:55:17.18Z
- **Changed:** 2026-04-01T08:33:37.303Z

### Repro Steps

Environment:  dev 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Visit Report list is opened  
• Visit Report 1 has cultivars on Location 1Steps: 
  
• Click on Create visit report button  
• Select Location 1 
• Scroll down to Cultivars  
• Click on Search icon for scoutables  
• Pay attention to the view 
  
Actual result: List of Scoutables is not fully visible (in some cases is not visible at all) 

 
Expected result: should be visible

---

## Bug #20205: There isn't validation for URL parameter for Location creation

- **URL:** [20205](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20205)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-10T13:48:57.083Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Env: dev 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Organization  
 Steps: 
• Click on Create Location button  
• Copy URL ->  https://dev.koppert.one/apps/organization/locations/new 
• Go to Admin -> Subsidiaries -> Settings 
• Select No for Can create locations -> Save 
• Open new tab  
• Paste  https://dev.koppert.one/apps/organization/locations/new 
• Pay attention to the page 
 Actual result: There isn't validation for URL parameter for Location creation 
 
Expected result: Locations list should be displayed

---

## Bug #20201: [Solution finder] Products are not shown when switching between enterprises

- **URL:** [20201](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20201)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Solution Finder
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-10T11:13:23.147Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Env: dev
 

 
Not reproducible on stage

Preconditions:
• User has access to the Solution finder 
• User has at least two enterprises added 
 Steps: 
 
• Open Knowledge > Solution finder page 
• Do not select any pest filter 
• Select some other enterprise in the dropdown -> Verify returned products  
• Do not select any pest filter
 
• Select some other enterprise in the dropdown -> Verify returned products 
 
 Actual result: No results found is shown after steps 3, 5

Video is attached

 
Note: products are shown once some value is selected in the pest filter 

 
Expected result: All products of the enterprise should be shown, no matter whether the filter was selected before changing the enterprise or not

---

## Bug #20196: 'Order reference' field is not highlighted in the opened order details modal after trying to create an order

- **URL:** [20196](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20196)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Order; PBI; Planner; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-09T15:03:20.303Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Pre conditions 
User is on Planner Order reference field is required 
STR:
• Add some quantity in the cell on Planner  
• Click Order button 
• Close the warning modal about the required order reference 
• Click on the red box 
• Check Order reference field 
 Actual result: 'Order reference' field is not highlighted in the opened order details modal
Expected result:

---

## Bug #20109: Sanitize ERP JSON response in Koppert Orders

- **URL:** [20109](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20109)
- **State:** Done
- **Area:** Digital-Services
- **AssignedTo:** Vladyslav Mahdenko
- **Created:** 2026-03-05T14:53:32.903Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

The KoppertOrdersHelper service currently crashes when parsing responses from the ERP/F&O API because the JSON sometimes contains unescaped control characters (\n, \r, \t) or invalid characters in @VALUE fields. 
Problem: 
• JSON.parse(data) fails with Bad control character in string literal when ERP responses contain raw newlines or other control characters.

---

## Bug #20105: Building complements are not shown on location selector on mobile prod

- **URL:** [20105](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20105)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-05T12:54:40.287Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

_(empty)_

---

## Bug #20083: Orders can remain in processing forever and are not retried by cron

- **URL:** [20083](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20083)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; hotfix; Production
- **AssignedTo:** Vladyslav Mahdenko
- **Created:** 2026-03-04T15:41:13.873Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment: prod

Description 
 
Some orders remain in processing state indefinitely. 
When initial async upsert flow is interrupted (for example our BE restart/crash), those records are never moved to failed/completed. 
The cron reprocess job was only retrying failed records, so old processing records were skipped forever. 
Steps to Reproduce 
Create/update order so a not-saved order record is stored with status processing. 
Interrupt processing before async upsert handler finishes. 
Run scheduled/manual upsert cron. 
Observe that order stays processing and is not retried (old behavior). 
Expected Result 
Stale processing records should be retried automatically by cron. 
Actual Result 
processing records can remain stuck and never re-enter retry flow. 
Root Cause 
upsert-orders mapped only: 
completed -> remove 
failed -> retry 
It ignored processing.

---

## Bug #20079: BE error appears in case when Country is hidden and user creates Location

- **URL:** [20079](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20079)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-04T15:11:05.947Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Env: dev

 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Admin -> Subsidiaries page is opened

 
 Steps: 
• Click on Location Details 
• Select Hidden for Country drop-down -> Save 
• Click on Organization -> Locations page  
• Click on Create Location button  
• Enter inf in all fields -> Click on Save 
• Pay attention to the page 
 Actual result: BE error appears in case when Country is hidden and user creates Location 
 
Expected result: Location should be created (or Error should be handled) TBD

---

## Bug #20070: [Visit reports] Search by location doesn't work on mobile

- **URL:** [20070](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20070)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; PBI; Visit report; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-04T14:20:24.387Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Env: iOS, Android 

 
Preconditions: 
• User has access to the footer and visit reports list 
• Some created visit reports exist  
• Enterprise with visit reports is added to the user, e.g. Agrifirm NWE B.V. 
  

 
Steps: 
• Log in to the Koppert mobile app 
• Open the Visit reports section from the footer 
• Try to search by the existing location value for which the report is created, e.g. Agrifirm 
 Actual result: Nothing is returned in the search 

 
Expected result: Reports that match the location entered in the search should be shown

From PBI
Scenario 2: Search by location GIVEN Visit reports page 
WHEN typing a location name to search a visit report 
THEN a list of all matching locations visit reports is displayed sorted by the newest reports on top

---

## Bug #20067: Attached files in scoutables in visit reports have incorrect names

- **URL:** [20067](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20067)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-04T12:30:00.883Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Env: dev, stage 

 
Preconditions: 
• User has access to view and create/edit visit reports  
• User has any enterprise added 
• User is logged into Koppert.One 
 Steps: 
• Open Knowledge > Visit reports 
• Create new report and select any location or edit any existing report 
• Scroll to Cultivar tabs 
• Add any cultivar if none exists and add a scoutable 
• Attach file(s) to the scoutable in formats .doc, .xlsx, .csv, .pdf, .mp4 to scoutables (not required to add to general notes, it's just for visibility)

 
• Save the report 
• Verify names of the attached file(s) in observations (scoutables) 
 Actual result: ID is shown instead of the actual file name

 

 
Expected result: File name should be shown (as in step 5 and as in general notes)

---

## Bug #20014: Create order grey line doesn't span the full width of the page

- **URL:** [20014](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20014)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Ordering; QualityAssurance
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-02T15:00:03.773Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:  stage, dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Order creation page is displayed  
 Steps: 
• Pay attention to order grey lineSlack: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1772447815144149 
  
Actual result: Create order grey line doesn't span the full width of the page
 
Expected result: Create order grey line should span the full width of the page

---

## Bug #20013: Corners are not rounded in drop-down after screen decreasing

- **URL:** [20013](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20013)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PRD; Production
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-02T14:02:25.01Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment: dev, stage, prod 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Visits Report list is displayed 
•  
 Steps: 
• Click on Locations drop-down again  
• Decrease the screen 
• Pay attention to the corners of drop-down  
• 
 
  
Actual result: Corners are not rounded in drop-down after screen decreasing  
Expected result: Should be rounded

---

## Bug #19882: Undefined is displayed instead of Enterprise address

- **URL:** [19882](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19882)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Enterprise; My_Profile; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-24T10:11:53.61Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR:
• Login to Koppert ONE as user with linked enterprises 
• Open My Profile 
• Check Enterprises list 
 Actual result: no addresses are displayed under each Enterprise

Expected result: Enterprise address is displayed

---

## Bug #19864: Only ID is displayed instead of Sales person name during searching

- **URL:** [19864](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19864)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; Regression; User
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-24T08:55:56.207Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
 Steps: 
• Find SSO user without sales person link -> Edit  
• Click on Search icon for Sales person Name 
• Enter some name-> Cayaro 
• Select 
• Pay attention to Sales person Name 
  
Actual result: Only ID is displayed instead of Sales person name during searching  
 
Expected result: Sales person name should be displayed as well -> Name + ID.

---

## Bug #19663: Added manually Enterprise that related to Sales person disappears after removing Sales person from Entrp and added again in F&O

- **URL:** [19663](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19663)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; BE; Enterprise; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-20T12:45:35.05Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:  Dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
• SSO (koppert.nl) user details is displayed + Advisor role 
• Sana agent Cayaro sales person (ID = 003519) has three entrp:Cayaro Peppers B.V. 
Cayaro Peppers Zevenhuizen B.V. 
Cayaro Peppers Bleiswijk B.V. 
 Steps: 
• Enterprise tab is displayed -> Click on Edit  
• Add manually Enterprise that related to Sales person-> e.g. Cayaro Peppers B.V. -> Save 
• Clic on Users tab -> Edit  
• Add Sana agent Cayaro sales person -> Save  
• Two Enterprises appear automaticallyCayaro Peppers Zevenhuizen B.V. 
Cayaro Peppers Bleiswijk B.V. 
• Remove Cayaro Peppers Bleiswijk B.V. using trash icon -> Save 
• Go to F&O  
• Find Cayaro Peppers B.V. -> Remove sales person group where Cayaro sales person is linked -> Save 
• Run the synk  
• Find Cayaro Peppers B.V. -> Add sales person group where Cayaro sales person is linked -> Save
 
• Run the synk 
 
• Go to user detail page -> Refresh  
• Remove the sales person  
• Pay attention to enterprise that was added manually -> Cayaro Peppers B.V. 
  
Actual result:  
• Cayaro Peppers B.V. is not displayed 
• Added manually Enterprise that related to Sales person disappears after removing Sales person from Entrp and added again in F&O 
  
 
Expected result:  
• Cayaro Peppers B.V. should be displayed as a manually linked Entrp has the heist priority level  
•

---

## Bug #19638: All manually added Enterprises disappear after sales person removing

- **URL:** [19638](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19638)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; BE; Enterprise; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-19T13:30:10.92Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:  Dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
• SSO (koppert.nl) user details is displayed + Advisor role 
• Sana agent Cayaro sales person (ID = 003519) has three entrp: 
Cayaro Peppers B.V.
 
Cayaro Peppers Zevenhuizen B.V.
 
Cayaro Peppers Bleiswijk B.V. 
 Steps: 
• Enterprise tab is displayed -> Click on Edit  
• Add manually Enterprise -> e.g. 101265496 SASK LTD - MOTHERLABS -> Save 
• Enterprise tab is displayed -> Click on Edit  
• Add three Enterprises that related to Sana agent Cayaro manually: 
Cayaro Peppers B.V. 
Cayaro Peppers Zevenhuizen B.V. 
Cayaro Peppers Bleiswijk B.V.
 
• Clic on Users tab -> Edit  
• Add Sana agent Cayaro sales person -> Save 
• Remove Sana agent Cayaro sales person -> Save 
• Pay attention to enterprises 
  
Actual result: All manually added Enterprises disappear after sales person removing  
 
Expected result:  
• 4 Enterprises should be displayed 
• Manually added Enterprises should be displayed after sales person removing

---

## Bug #19636: Organization > Locations: Tooltip on hover is not shown for the truncated values

- **URL:** [19636](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19636)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Locations; PBI; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-19T12:18:12.69Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Env: dev
Chrome, Edge
 

 
Preconditions:
 
• Enterprise with locations that have long values exists, e.g. C.J. Klep B.V.
 
• Assign the enterprise from the above to any user
 
• Ensure that a role of the above user has a permission 'Read locations list' enabled (under Locations (Koppert))
 
• Ensure that a role of the above user has a permission 'Location section' enabled (under Sections (Koppert))
 

Steps:
 
• Login to the Koppert.One with the user from precondtions 
• Open Organization > Locations 
• In the enterprises dropdown select the enterprise from preconditions 
• Find a location record that has some long values, e.g. Some really really... 
• Open the details of the location

 
• Hover over the truncated values, e.g. Street, Building Complement for the screenshot above 
 Actual result: Tooltip is not shown 
 

 
Expected result: Tooltip should be shown for the truncated values (similar as it's for the locations list)

---

## Bug #19634: 500 appears during VR creation + scotables

- **URL:** [19634](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19634)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Visit report; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-19T11:09:30.85Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Visits report list is displayed 
 Steps: 
• Click Create Visit Report button  
• Add all required inf  
• Add Cultivar with max characters  
• Add scoutables 
- 7777 test... 
• Select Warning, Under Control, Critical one by one -> Please, look the video with test data 
• Click on Create button 
• Pay attention to the error 
  
Actual result: 500 appears during VR creation + scotables
Preview -> {&quot;locationId&quot;:&quot;89e614e5-8b3f-461a-91c1-9e3543fffbe6&quot;,&quot;date&quot;:&quot;2026-03-05&quot;,&quot;cultivars&quot;:[&quot;testtesttesttesttesttest&quot;,&quot;test&quot;],&quot;title&quot;:&quot;TEST&quot;,&quot;text&quot;:&quot;&quot;,&quot;items&quot;:[{&quot;scoutableId&quot;:&quot;084d1fd6-a646-4171-9128-07ebfd377325&quot;,&quot;cultivar&quot;:&quot;testtesttesttesttesttest&quot;,&quot;status&quot;:&quot;under-control&quot;,&quot;stage&quot;:&quot;adult&quot;,&quot;id&quot;:&quot;08b43cb3-c8c4-4053-a725-dc3fa2649608&quot;},{&quot;scoutableId&quot;:&quot;084d1fd6-a646-4171-9128-07ebfd377325&quot;,&quot;cultivar&quot;:&quot;testtesttesttesttesttest&quot;,&quot;status&quot;:&quot;under-control&quot;,&quot;stage&quot;:&quot;egg&quot;,&quot;id&quot;:&quot;5fe8526b-59f8-4dd1-a078-5d68cdaad7a9&quot;},{&quot;scoutableId&quot;:&quot;084d1fd6-a646-4171-9128-07ebfd377325&quot;,&quot;cultivar&quot;:&quot;testtesttesttesttesttest&quot;,&quot;status&quot;:&quot;under-control&quot;,&quot;stage&quot;:&quot;larva&quot;,&quot;id&quot;:&quot;75c0d900-0c2f-4c6d-a826-088950d16811&quot;},{&quot;scoutableId&quot;:&quot;084d1fd6-a646-4171-9128-07ebfd377325&quot;,&quot;cultivar&quot;:&quot;testtesttesttesttesttest&quot;,&quot;status&quot;:&quot;under-control&quot;,&quot;stage&quot;:&quot;nymph&quot;,&quot;id&quot;:&quot;abc3fa70-7064-4efc-ba5a-d0905559c56b&quot;},{&quot;scoutableId&quot;:&quot;084d1fd6-a646-4171-9128-07ebfd377325&quot;,&quot;cultivar&quot;:&quot;testtesttesttesttesttest&quot;,&quot;status&quot;:&quot;under-control&quot;,&quot;stage&quot;:&quot;population&quot;,&quot;id&quot;:&quot;fdd5ca8e-6d1b-4490-b911-9e42b133eae3&quot;},{&quot;scoutableId&quot;:&quot;084d1fd6-a646-4171-9128-07ebfd377325&quot;,&quot;cultivar&quot;:&quot;test&quot;,&quot;status&quot;:&quot;under-control&quot;,&quot;stage&quot;:&quot;unspecified&quot;},{&quot;scoutableId&quot;:&quot;084d1fd6-a646-4171-9128-07ebfd377325&quot;,&quot;cultivar&quot;:&quot;testtesttesttesttesttest&quot;,&quot;status&quot;:&quot;under-control&quot;,&quot;stage&quot;:&quot;unspecified&quot;}]}
 

 
 
 
Expected result: 200 should be displayed

---

## Bug #19626: The locations stop loading in the list after opening the location details page

- **URL:** [19626](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19626)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Locations; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-18T15:57:02.05Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR:
HORTALAN MED, S.L. enterprise is linked to a user
• Open Locations page 
• CLICK ON THE 'VIEW' BUTTON OF THE FIRST LOCATION IN THE LIST 
• Observe Location details 
• Return to Location list 
• Scroll down to load new locations 
 Actual result: new locations are not loading

Expected result: infinite scrolling works properly, new locations are displayed in the list after scrolling down

---

## Bug #19624: Organisation > Locations: 'View' button is clickable for a delivery location when 'Read location' is disabled

- **URL:** [19624](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19624)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Locations; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-18T15:47:20.413Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Env: dev 
 
Chrome, EdgePreconditions:• Enterprise with at least one delivery location exists, e.g. Hortland Med, S.L. 
• Assign the enterprise from the above to any user 
• Ensure that a role of the above user has a permission 'Read locations list' enabled (under Locations (Koppert)) 
• Ensure that a role of the above user has a permission 'Read location' is not enabled (under Locations (Koppert))
 
• Ensure that a role of the above user has a permission 'Location section' enabled (under Sections (Koppert))
 
 Steps: 
• Login to the Koppert.One with the user from precondtions 
• Open Organization > Locations 
• In the enterprises dropdown select the enterprise from preconditions 
• Press on 'View' button next to any delivery address

 
 Actual result: 'View' button is clickable, the page reloads on each click and for a few miliseconds 'There are no locations to display' is shown in the background 

 
Expected result: 'View' button should be disabled  'View' button should be hidden

---

## Bug #19622: Organization > Locations: Location list keeps loading when scrolling till the end of the locations for enterprise with big number of locations

- **URL:** [19622](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19622)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Locations; PBI; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-18T15:22:02.913Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Env: dev
Chrome, Edge

Preconditions:
• Enterprise with a big number of locations exists, e.g. Hortland Med, S.L. 
• Assign the enterprise from the above to any user 
• Ensure that a role of the above user has a permission 'Read locations list' enabled (under Locations (Koppert)) 
• Ensure that a role of the above user has a permission 'Location section' enabled (under Sections (Koppert))
 
 Steps: 
• Login to the Koppert.One with the user from precondtions 
• Open Organization > Locations 
• In the enterprises dropdown select the enterprise from preconditions 
• Scroll through the locations list till the bottom untill you've reached the last location 
 Actual result: The locations list keeps loading even though all addresses have been shown 

 

 
Expected result: The list shouldn't be loaded when we've reached the end of the location list

---

## Bug #19591: [Visit report] A very long word is not wrapped in Observations section

- **URL:** [19591](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19591)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; QualityAssurance; Visit report; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-17T09:36:51.383Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR:

• Open Visit reports 
• Create a new one 
• Add different attachments 
• Add some scoutable in Observation section 
• Add some text with a very long word 
• Check behaviour 
 Actual result: text is not wrapped

Expected result: a long word is wrapped

---

## Bug #19561: Sales person can be added to e.g. n-ix.com email during creation

- **URL:** [19561](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19561)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; FE; PBI; Roles; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-16T14:16:19.84Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:  Dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
 Steps: 
• Click on Create user button  
• Add to e.g. n-ix.com email 
• Fill all required fields 
• Select Advisor role 
• Link sales person  
• Click on Create button  
• Pay attention to sales person 
https://koppertplatform.slack.com/archives/C0464PF164W/p1771248611637129
 
  
Actual result: Sales person can be added to e.g. n-ix.com email during creation 
 
Expected result: Should not be created, only SSO user allow to ass sales persons

---

## Bug #19556: The 'future' date is setting in 'To' date field if select the last week in 'From' field

- **URL:** [19556](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19556)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Analysis; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-16T13:01:36.447Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR:
• Open Analysis page 
• Select the last week in the 'From' date field 
• Check the 'To' date field 
 Actual result: future date is displayed

Expected result: the current week is displayed

---

## Bug #19553: Extra toast message appears when change Advisor role for not SSO email

- **URL:** [19553](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19553)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; FE; PBI; Roles; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-16T11:45:07.94Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:  Dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
• SSO (koppert.nl) user details is displayed 
 Steps: 
• Click on Edit 
• Unchecked Advisor role 
• Click on Update user button  
• Pay attention to toast message 
  
Actual result: Extra toast message appears when change Advisor role for not SSO email -> Forbidden  
 
Expected result: Only &quot;Salesperson link can only be used for Advisor role&quot; should be displayed

---

## Bug #19513: Swagger doesn't work on dev/stage env

- **URL:** [19513](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19513)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** BE; FE
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-16T10:43:29.6Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment: dev, stage 
 
 
 
 
 
 
 
 
 
 
 
 
Preconditions:• Swagger link -> https://api-dev.koppert.one/api 
 Steps: 
• Click on Authorize button  
• Enter valid email and password -> Save

 
  
Actual result: Swagger doesn't work on dev env and user can't authorize 
 
 
Expected result: should be authorized

---

## Bug #19408: Adress is undefined in admin section

- **URL:** [19408](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19408)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-02-10T15:37:56.64Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin -> to see users 
 Steps: 
• Open any user with enterprises 
• Select enterprises tab 
• Observe 
  
Actual result: Undefined is displayed 

 
Expected result: Undefined should not be displayed

---

## Bug #19406: 'From' date still displays the date in this year after changing 'To' date to the past year

- **URL:** [19406](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19406)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Analysis; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-10T15:02:25.807Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR: 

 
• Open the Analysys page 
• Change 'To' date to some week in past year ( e.g. week 45 - 2025) 
• Check behavior in the 'From' date field 
 Actual result: the date in 'From' field doesn't change to the 12-week range in past year

 

Expected result: date in the 'From' field reflects changes in the 'To' field and shows a 12-week range

---

## Bug #19403: Translations are not displayed for product counter in Solution Finder

- **URL:** [19403](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19403)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Solution Finder; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-10T12:10:40.26Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One  
• Entr has a few locations 
• NL6 Entr is selected 
 Steps: 
• Click on My profile -> Select e.g. Polish 
• Click on Knowledge -> Solution Finder  
• Click on Order button  
• Pay attention to the product counter translation  
  
Actual result: Translations are not displayed for product counter in Solution Finder 
 
 
Expected result: should be translated

---

## Bug #19397: 'No locations' message is not displayed in Location selector if Enterprise without locations is selected

- **URL:** [19397](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19397)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Analysis; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-09T13:56:22.327Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR:• Open Analysis page 
• Select 48 Farms (Project Packs) Enterprise 
• Check Locations selector

Actual result: The first location from previously selected enterprise is displayed

 
 Expected result: location dropdown is inactive with 'No locations' message

---

## Bug #19391: Can select weeks past the first

- **URL:** [19391](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19391)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Analysis; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-09T08:04:01.807Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Description

take from private message with @any

### Repro Steps

Copied from Description when changed from Task to Bug
take from private message with Anya

---

## Bug #19293: 500 appears after Entrp deleting

- **URL:** [19293](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19293)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; BE; Enterprise; PRD; Production; QualityAssurance
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-03T12:17:34.86Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment: dev, prod 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Adminis displayed -> Enterprises 
•  
 Steps: 
• Click on any Enterrpise  
• Edit -> Click on Delete -> Confirm  
• Pay attention 
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1770120583228749 
  
Actual result: 500 appears after Entrp deleting
 

 
Expected result:  200 should appear after Entrp deleting and Entrpr should be deleted

---

## Bug #19278: User is logged out from Web after changing the permissions

- **URL:** [19278](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19278)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-02T13:48:36.353Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR:

• Open the Admin panel 
• Go to Roles Permissions 
• Change some permissions 
 Actual result: User is logged out from Web app, and everything works normally after refreshing the page 

Expected result: user is not logged out

---

## Bug #19277: Checkbox is displayed in wrong place on visit reports

- **URL:** [19277](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19277)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Visit report; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-02T12:55:57.977Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:  Dev/Stage 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Visit reports opened 
 Steps: 
• Press create visit report 
• check Email notifications dropdown 
  
Actual result: It is displayed on top 
 
 
Expected result: Checkbox should be in one row with name

---

## Bug #19265: The error appears on the Login page after deleted user is redirected from Planner

- **URL:** [19265](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19265)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Planner; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-30T16:11:38.93Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR: 
• Open Planner as User 1-> add quantity -> do not create an order 
• Do not close a tab 
• Log in as Admin and delete User 1 
• Try to create an order as User 1 
 Actual result: The error appears on the Login page after deleted user is redirected from Planner

Expected result: no error on Login page

---

## Bug #19239: Error occured when viewing and editing visit reports

- **URL:** [19239](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19239)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Visit report
- **AssignedTo:** Anya Podolynna
- **Created:** 2026-01-30T10:02:01.58Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR: 
• Click to view Visit report 
 AR: 'Something went wrong' message is shown 

 
2.  CLick to edit viit report 
3. Add attachments, edit content 
4. CLick to save 
AR: Text is edited and 'Something went wrong' message is shown. Attachments are not uploaded.  
ER: text and attachments are edited 

 
See attached video

---

## Bug #19220: BCC emails are not being received in case when User 1 linked to Entrp + order notification is OFF and User 2 is not added to same Entr + added BCC

- **URL:** [19220](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19220)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Order; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-30T09:12:08.027Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
 
 
 
Preconditions:• Preconditions: 
 - User logged in to Koppert One as User 1- Has role with access to &quot;Orders&quot;- Only User 1 is linked to Entrpr -> Schreurs Holland 
- User 4 is external -> gmail.com 
- Users select different languages:1)  User 1 -> Portuguese 
2) User 2 -> France3) User 3 -> Polski 
- Email Notifications are turn OFF on My profile for  
1)  User 1  
2) User 2 3) User 3  
- User 2, User 3, User 4 are added as BCC on Admin -> Subsidiaries 
- Orders tab is opened -> Planner or Simple ordering 
 Steps: 
• Edit some order -> Save 
• Pay attention to the BCC email 
  
Actual result: BCC emails are not being received in case when User 1 linked to Entrp + order notification is OFF and User 2 is not added to same Entr + added BCC 

 
Expected result: BCC emails should be received

---

## Bug #19207: Visit-reports loads items by 1

- **URL:** [19207](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19207)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; QualityAssurance; Visit report
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-29T12:33:13.04Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One  
• Entr has a few locations 
• Visit reports list is opened 
 Steps: 
• Select Enterprise with many VRs 
• Scroll down  
• Pay attention to the requestshttps://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1769596548590039 
  
Actual result: Visit-reports loads items by 1 

 
 
Expected result: TBD

---

## Bug #19195: Manually linked enterprises are unlinked after sales person removal

- **URL:** [19195](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19195)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-29T09:27:04.043Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment:  Dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
 Steps: 
• Find SSO user without sales person link 
• Add few enterprises to user 
• Link sales person that contain the same enterprises 
• Unlink sales person 
• Check enterprises 
  
Actual result: Manually linked enterprise is unlinked after sales person removal (because sales person contain the same enterprise) 
 
Expected result: Manually added enterprises should not be removed from user after unlinking sales person (even if they are going with sales person)

Check video attachment

---

## Bug #19188: Deleted user is not redirected to Login page after creating a Visit report

- **URL:** [19188](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19188)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Visit report; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-28T14:00:01.983Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

STR:

• Open the 'Create Visit report' page as User 1 -> fill in the fields -> do not create a report  
• Do not close a tab
 
• Log in as Admin and delete User 1 
• Try to save a visit report as User 1 
 Actual result: the error is displayed, User is not redirected to Login screen

 

Expected result:  User is redirected to Login screen after clicking on the \Create Visit report\ button

---

## Bug #18948: Authors are not linked with users

- **URL:** [18948](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18948)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE
- **AssignedTo:** Ievgen Shemonaiev
- **Created:** 2026-01-20T12:20:50.483Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

There are some number of authors which have no linked user BUT user exists.  
Expected result: author doesn't have linked user only if user has been deleted because of GDPR request 
Actual result:

---

## Bug #18921: Orders can be created on locked Enterprises due to slow connection with F&O

- **URL:** [18921](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18921)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** BE; Cool; Orders; Planner; QualityAssurance
- **AssignedTo:** Tiffany Levens
- **Created:** 2026-01-19T11:09:41.7Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Environment: dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Planner is displayed 
• F&O is opened -> All customers

 
 Steps: 
• Select a All in COLLECTIONS -> Save -> Agrifirm NWE B.V is locked 
• Go to Planner  
• Select Agrifirm NWE B.V 
• Pay attention  
  
Actual result: Orders can be created on locked Enterprises due to slow connection with F&O
 
 
Expected result:  Orders should NOT be created on locked Enterprises due to slow connection with F&O

---

## Bug #12004: Letter spacing in title cuts off some letters

- **URL:** [12004](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/12004)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Orders; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2024-11-06T10:50:56.507Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Description

Copied from Repro Steps when changed from Bug to Technical Debt

 
 

 
See title on Order Log page. 

 
We need to create a font that looks like the one we squeezed to look like it does, the koppert style guide requires us to squeeze this front to get this, result, but that breaks all other math related to font scaling.

### Repro Steps

See title on Order Log page. 

 

 

Copied from Description when changed from Technical Debt to Bug

Copied from Repro Steps when changed from Bug to Technical Debt

 
 

 
See title on Order Log page. 

 
We need to create a font that looks like the one we squeezed to look like it does, the koppert style guide requires us to squeeze this front to get this, result, but that breaks all other math related to font scaling.

---

## Bug #2589: Confirmation pop-up placed in wrong place

- **URL:** [2589](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/2589)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Bug; Enterprise; FE; Koppert One; Portal; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2023-01-16T18:37:20.623Z
- **Changed:** 2026-04-01T08:11:36.983Z

### Repro Steps

Precondition:  
- user with role &quot;Admin&quot; logged in to Portal  
- Enterprise page is opened  
- Users and Enterprises is created  

 
Steps to reproduse  
• Click on created enterprise  
• Click on &quot;Users&quot; tab  
• Click on +Add users to this enterprise  
• Click on check box to select user  
• Click &quot;OK&quot; button  
• Check confirmation message  
 Expected result: confirmation message &quot;Confirmation message: *amount* user(s) added to *enterprise name*&quot; in top right corner  

 
Actual result: confirmation message placed in the lower right corner, confirmation message: *amount* users added to *enterprise name*

---

## Bug #20409: Default shipping methods don't apply to newly created enterprises

- **URL:** [20409](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20409)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** QualityAssurance; Shipping Methods; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-17T12:21:59.2Z
- **Changed:** 2026-04-01T07:55:50.327Z

### Repro Steps

Pre conditions 

 
2 shipping methods are available for NL6 subsidiary

STR:
 

 
• Add a new NL6 enterprise to Koppert One (or as Josiah did, delete and re-add an NL6 enterprise). 
• Go to edit Enterprise to click the Sync now button. 
• Check that enterprise is created 
• Check shipping methods tab 
 
 
Actual result: No shipping method choice available on Planner, even though NL6 has two default shippping methods setup. The shipping methods are not active for newly created enterprise.

 
Expected result: The 2 shipping methods are active for newly created enterprise and available for a user on Planner. 

Link to Slack: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1773649365129169

---

## Bug #18971: The data is not loaded on Planner from the first time, it appears after refreshing the page (doesn't reproduce each time)

- **URL:** [18971](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18971)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** Planner; Production; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-22T08:29:49.727Z
- **Changed:** 2026-04-01T07:55:40.523Z

### Repro Steps

STR:

 
• Log in to Koppert One on Production 
• Switch between enterprises 
• Check how the data loads on Planner

NOTE: It's not easy to reproduce. It requires some time. 
 Actual result: sometimes data is not loaded after opening Planner. It shows data after refreshing the page. 
Please, check the video starting from 40 sec

Expected result: data is loaded after Planner is opened, and doesn't require refreshing the page.

---

## Bug #18461: All modules are available after disabling mobile BE permissions

- **URL:** [18461](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18461)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** BE; Mobile end points; Permissions; Regression
- **AssignedTo:** Yuliya Halamay
- **Created:** 2025-12-19T08:26:07.213Z
- **Changed:** 2026-04-01T07:55:19.17Z

### Repro Steps

Environment:  stage 
Build: v.3.2.0 OTA 3 
 
 
Preconditions:• User logged in to Koppert One app as grower + orderer role 
 Steps: 
• Open permissions page on web and disable these sections for all roles -> save
- Locations (Mobile BE) 
- Orders (Mobile BE) 
- Products (Mobile BE) 
- Side Effects (Mobile BE)
 
• Close the app on mobile, open again, relogin and try view & create orders, use side effects app 
  
Actual result: User is able to do all the actions as previously 
 
Expected result: BE should block user from listed actions

---

## Bug #20408: Search doesn't clear after changing Entrpr

- **URL:** [20408](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20408)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** Mobile; Regression; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-17T11:04:14.737Z
- **Changed:** 2026-04-01T07:55:13.523Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has some Visit Reports Steps: 
  
• Enter some inf in Search  
• Change the Enterprise  
• Pay attention to the inf in Search 
https://koppertplatform.slack.com/archives/C0464PF164W/p1773326668698769?thread_ts=1773308332.021939&cid=C0464PF164W 
  
Actual result: Search doesn't clear after changing Entrpr 
 
Expected result: Should be empty

---

## Bug #19943: Leave guard appears for empty cultivar during creation and doesn't appear for created cultivar during deleting

- **URL:** [19943](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19943)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** FE; Regression; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-27T10:48:26.527Z
- **Changed:** 2026-04-01T07:55:05.683Z

### Repro Steps

Environment:  dev, stage 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Visit Report lists is displayed 
 Steps: 
• Clic on any visit report -> Edit OR Create a visit report 
• Click on Cultivar tab -> Don't enter anything 
• Click on cross icon -> Leave guard appears 
• Enter sone Cultivar name  
• Click on tick icon to save  
• Click on cross icon
 
• Pay attention to leave guard 
  
Actual result:  
• leave guard appears for empty cultivar after clicking on cross icon 
• leave guard doesn't appear for created cultivar after clicking on cross icon 
  
Expected result:  

• leave guard should NOT appear for empty or unsaved cultivar after clicking on cross icon 
• leave guard should appear for created cultivar after clicking on cross icon

---

## Bug #16938: Calendar changes despite no changes being made in F&O for a certain location the order

- **URL:** [16938](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16938)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** BE; Planner; Production; QualityAssurance; rel; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-09T08:16:33.547Z
- **Changed:** 2026-04-01T07:54:43.99Z

### Repro Steps

Application: Web 
Platform: for Web - Browser EdgeEnvironment: PROD 
 
 
 
 
 
 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Planner page is displayed 
 Steps:
 
• Look at Willem Jongenotter Kwekerij B.V. - NL6-60872   Location Willem Jongenotter Kwekerij BV (Oostvoorne)
2. Look at planner order-days before order-deadline (morning)
3. Look at planner order-days  after order deadline (afternoon)

Actual result: Calendar changes despite no changes being made in F&O for a certain location the order
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1759920578824659
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1759992360638129

Expected result: Calendar should NOT be changed despite no changes being made in F&O for a certain location the order

---

## Bug #20439: State field clears after country selection

- **URL:** [20439](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20439)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** FE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-20T10:52:12.403Z
- **Changed:** 2026-04-01T07:54:04.567Z

### Repro Steps

Env: dev 
 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Organizations -> Location page is opened 
• State is added as Optional in Location Details <- NL6 <- Subsidiaries <- Admin

 
 CASE 1 
Steps: 
• Click on Create location  
• Enter inf in State  
• Select Country or chose another  
• Pay attention to the field names 
 Actual result: State field clears after country selection  
 
Expected result: State field should NOT be cleared after country selection (TBD)

---

## Bug #20217: 500 appears during Location creation when select Ukraine country

- **URL:** [20217](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20217)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** BE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-11T12:41:31.9Z
- **Changed:** 2026-04-01T07:54:00.33Z

### Repro Steps

Env: dev 
 
 
 
 

CASE 1 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Set next e.g. settings to create location:Subsidiary: NoEnterprise: YesUser: Undefined
or 
Subsidiary: NoEnterprise: NoUser: Yes
 
• Organizations -> Location page is opened 
  
 
Steps: 
• Click on Create location  
• Enter some inf in some field 
• Select Ukraine county 
• CLick on Save button  
• Pay attention to the Location  
 Actual result: 500 appears during Location creation when select Ukraine country
 
 
Expected result:  200 should be displayed and location should be created (TBD)

---

## Bug #20082: User can not create Location due to 502 related to State and Country fields

- **URL:** [20082](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20082)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** BE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-04T15:32:02.547Z
- **Changed:** 2026-04-01T07:53:54.977Z

### Repro Steps

Env: dev 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Admin -> Subsidiaries page is opened 
 
 Steps: 
• Click on Organization -> Locations page  
• Click on Create Location button  
• Enter inf in all fields -> Click on Save 
• Pay attention to the page 
 Actual result: User can not create Location due to 502 related to State and Country fields 
 
Expected result: Location should be created (or Error should be handled) TBD

---

## Bug #20728: Users are not getting email notifications about order updates

- **URL:** [20728](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20728)
- **State:** New
- **Area:** Digital-Services
- **Created:** 2026-03-31T20:31:02.123Z
- **Changed:** 2026-03-31T20:31:02.123Z

### Repro Steps

On stage.

 
• Make sure email notifications enabled in user profile 
• Create or update order 
• Check email inbox

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

Env: dev 
 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Overview  page is opened  
• Enterprise is C.J. Klep 
• User has some order  
 Steps: 
• Decrease the screen  
• Click on order box 
• Pay attention to the Tooltip
NOTE: the same for Planner 
 Actual result: Tooltip is cut off for small screen  
 
Expected result: Tooltip should NOT cut off for small screen

---

## Bug #19962: Double quotes getting removed from order reference

- **URL:** [19962](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19962)
- **State:** Removed
- **Area:** Digital-Services
- **Created:** 2026-03-01T00:26:53.28Z
- **Changed:** 2026-03-31T10:44:01.72Z

### Repro Steps

• Create order with double quotes in Order reference field - &quot;
 
• Save it
 
• Open it, observe

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
- User logged in to Koppert One 
- Has role with access to &quot;Orders&quot; and additional role &quot;Orderer&quot; 
 
- Has linked enterprise with data 
 
- Planner page is opened

Setup the timer so, it reaches it's deadline in 1 minute (can use in the URL parameter &quot;?hour=X?minutes=Y&quot; to setup).

Expected: The timer is shown with 1 minute left until the deadline).
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
 
• Open mobile app -> Create account 
• Fill in required fields 
• Go to email -> check invitation 
• Set up a password 
• Check that user is navigated to mobile app 
• Fill in the rest of the fields that appear in mobile app 
• Check Settings, Side effects screens 
• Close the app (not cold kill) 
• Open app again 
 Actual result: app is opened, user is logged out 

 
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

 
Preconditions: 
• User has access to Order module 
• User is logged in to Koppert.One 
• User has enabled emails notifications 
  

 
Steps: 
• Change the language under your profile to any language other than English 
• Open Order > Order list 
• Verify that section in the side bar and page title are translated (ex Orders, now Order list) -> see Actual result 
• Create a new order or update any existing  
• Verify received email related to orders and verify translations 
 Actual result after steps steps 3, 5 -> Order list translations are not applied

 

 
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

Env: dev 
 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Orders list is displayed 
• Orders details is displayed for NL6-SO00252834
 
• Enterprise is C.J. Klep -> Location C.J. Klep - 
 Steps: 
• Pay attention to the date for order NL6-SO00252834 
 Actual result:  
• There is date differences for the same order (NL6-SO00252834) on Orders List and Orders Details 
• 30 march on details and 1 april on orders list  
 
 
 
 
Expected result: The date should be the same

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

Preconditions: 
• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Organization is displayed  
  
Steps: 
• Click on View 
• Decrease the page 
• Pay attention to the Edit button  
• Click on Edit 
• Pay attention to the Email and Name fields 
  
Actual result:  
• Edit button overlaps fields after page size decreases 
• Email and Name fields do not decrease as the page size decreases
 
  

 

 
Expected result:  
• Edit button should NOT overlap fields after page size decreases 
• Email and Name fields should be decreased as the page size decreases 
 
 
Preconditions: 
• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Visit reports is displayed  
  
Steps: 
• Click on View for VR + observations 
• Decrease the page 
• Pay attention to the fields 
  
Actual result: Fields do not decrease as the page size decreases 
 
 
Expected result: Fields should be decreased as the page size decreases

---

## Bug #18046: Some drop-downs are closed some of them not after clicking inside after activation search icon

- **URL:** [18046](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18046)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Admin; FE; Organization; Planner; Regression; Visit report; Visit reports; Web
- **Created:** 2025-12-01T10:48:55.2Z
- **Changed:** 2026-03-31T09:11:51.75Z

### Repro Steps

Environment: stage 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Planner is displayed 
• User has linked Enterprises with 10 locations 
•  
 Steps: 
• Click on Search icon in Enterprise drop-down  
• Click on the middle of drop-down  
• Click on the middle of drop-down again -> List of Enterprises continue displaying 
 
• Click on Search icon in Location drop-down  
• Click on the middle of drop-down  
• Click on the middle of drop-down again -> List of Locations close
NOTE: the same on Visit REports, Admin, Orfanization  
  
Actual result: Some drop-dows are closed some of them no after clicking inside after activation search icon  
Expected result: Should be consistently (TBD)

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

STR: 
• Add user's email to the SANA export file 
• Process Sana export 
• Check user details 
 Actual result: User doesn't have any role, but enterprise was assigned

User's Email:
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
• Admin user with permissions to edit team members and enterprises exist 
• Local Admin user with permissions to edit team members and enterprises exist 
• Grower+Orderer user exists (with not koppert email) 
 Steps: 
• Log in as Admin user 
• Open Organizarion > Team 
• Open details of Grower+Orderer 

 
• Navigate to 'Enterprises' tab 
 Actual result: 'Edit' button is disabled

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

Environment: pre-prod 
 
Samsung Galaxy A35 5GSM-A356B/DSVersion 14 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has Visit Report 1 
• Visit Reports list is displayedSteps: 
  
• Click on Visit Report 1 
• Click on trash icon -> Confirm  
• Pay attention to the Search field on Visit Reports list 

 
  
Actual result: Search field disappears  after Visit Report deleting on Android 
 
Expected result: Search field should be displayed

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
 
• Open Orders in the mobile app 
• Select '4Evergreen Terneuzen 1 B.V. ' enterprise 
• Check the order list in the mobile app 
 Actual result: the list is empty in the mobile app, however there is data

Expected result: the orders are displayed in the list in the mobile app

CASE 2STR: 
• Open Orders in the mobile app  
• Select 'AppHarvest' enterprise 
• Select different locations 
• Check the order #US1-SO00282996 
 Actual result: #US1-SO00282996 is displayed on different locations (please, look at the video)Expected result: #US1-SO00282996 related to one location

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
 
• Set up the banner on Planner 
• Open Planner in another tab -> check that banner is present there 
• Change the end date so banner disappears 
• Check that banner is still present on Planner 
• Change the enterprise to another one that relates to the same subsidiary 
• Check behaviour of banner 
 Actual result: the banner doesn't disappear
Expected result: the banner disappears from Planner when switching enterprise

---

## Bug #20432: Not possible to clear pest filter by pressing 'X' button when no products are shown in 'Add product' modal in mobile app

- **URL:** [20432](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20432)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Mobile; Planner
- **Created:** 2026-03-19T09:39:23.07Z
- **Changed:** 2026-03-30T13:49:45.097Z

### Repro Steps

Env: dev
iPhone Xs Max iOS 18.1
Samsung A52 Android 14

Preconditions: 
• User has no enterprises added  
• User can add products in planner/order sections 
• User is logged into KopertOne mobile app  
 Steps:  
• Open Planner > Order mode ON > Add product 
• In the appered modal press in 'Filter by pest' and select any value 
• Press 'X' button to clear the filter

 
 Actual result: Nothing happens 

 
Expected result: 'Filter by pest' should be cleared 

 
Note: if products are shown in the 'Add products' modal, then the filter is cleared by pressing on 'X' button (and in the case if after applying the search, 'No products found' is displayed)

---

## Bug #20435: [Visit reports] Visit reports keep loading when scrolling till the end of the list with a big number of visit reports

- **URL:** [20435](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20435)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Visit report; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-19T12:47:00.427Z
- **Changed:** 2026-03-30T13:33:56.17Z

### Repro Steps

Env: dev
 
 
Chrome 

 
Preconditions: 
• Enterprise with a big number of visit reports exists, e.g. Agrifirm NWE B.V.  
• Enterprise is added to a user 
• User has access to visit reports 
• User is logged in to KoppertOne 
 Steps: 
• Open Knowledge > Visit reports 
• Ensure to select the enterprise from the preconditions 
• Scroll till the very end of the visit reports list

See video attached Visit reports_Loading issue.mp4 
 Actual result: 

The spinner is shown, and it looks like the list keeps loading, but all reports are shown

 
When going to some other page, then back to 'Visit reports' and scrolling till the end -> it works fine, page is not loading anymore 

Expected result: 
Spinner shouldn't be shown

Notes: 
there was a similar issue in locations 
BUG 19622

---

## Bug #20364: Tooltip on hover is not shown in the enterprise selector when it's closed

- **URL:** [20364](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20364)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Enterprise; FE; QualityAssurance
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-16T14:21:37.313Z
- **Changed:** 2026-03-30T13:30:46.183Z

### Repro Steps

Env: dev, stage, prod 

Steps: 
• Log in as any user who has an enterprise added
 
• Hover over the enterprise selector (when it's closed) 
 Slack https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1773324971558619

 
Actual result: Tooltip with the enterprise details (full name and customer code/ERP customer key) is not shown when the selector is closed

 

 
Expected result: Tooltop on hover should be shown (similar to how it's shown when the selector is opened)

---

## Bug #19933: Order-deadline is inconsistent and changes to correct one after refreshing a page on Planner

- **URL:** [19933](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19933)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Blocked by CIT; Planner; Production; QualityAssurance; Web
- **AssignedTo:** Tiffany Levens
- **Created:** 2026-02-26T15:46:56.22Z
- **Changed:** 2026-03-30T13:09:14.337Z

### Repro Steps

STR:

1. Link your user to 'Bayer Holland B.V.' enterprise
2. Open planner
3. Check the available dates for ordering 

 
Actual result: in some cases, the cells for ordering were absent on Planner; however, they should be there. They appear after refreshing a page.

Expected result: the correct dates are available for ordering products

Link to conversation in Slack: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1772113475589799

---

## Bug #18365: Shipping method drop-down expands after choosing Shipping method + command R

- **URL:** [18365](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18365)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Planner; Web
- **AssignedTo:** Tiffany Levens
- **Created:** 2025-12-15T11:57:21.183Z
- **Changed:** 2026-03-30T13:08:04.167Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to Planner/Orders 
• User logged in to Koppert One 
• Planner is displayed 
 Steps: 
• Click on order box 
• Change/Select Shipping method 
• Click on Command R 
• Pay attention to the drop-down
NOTE: the same for simple order creation/editing  
  
Actual result: Shipping method drop-down expands after choosing Shipping method + command R
 
Expected result: Shipping method drop-down should be closed

---

## Bug #20680: Location selector is still clickable and no tooltip hover for 1 enteprise location

- **URL:** [20680](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20680)
- **State:** New
- **Area:** Digital-Services
- **Tags:** FE; Locations; PBI; Web
- **AssignedTo:** Stanislav Iliashchuk
- **Created:** 2026-03-30T12:58:03.17Z
- **Changed:** 2026-03-30T12:58:03.17Z

### Repro Steps

Env: dev 

 
Preconditions: 
• User has access to Planner/Order/Overview/Visit reports 
• User is added to the enterprise with 1 location (location has a long name), e.g. Gospodarstwo Rolne Katarzyna... 
 Steps: 
• Open Order > Planner 
• Ensure to select an enterprise from the preconditions (with 1 location that has a long name) 
• Verify 'Locations' selector 
 Actual result:  
• Location selector is clickable 
  
• Tooltip on hover is not shown 
 
 
Expected result:  
 
• Location selector is not clickable 
  
• Tooltip on hover is shown 
 
 

See Scenario 1 in the related PBI

 
NOTE: it applies to all places with the Location selector 

 
• Planner   
• Simple Order create  
• Visit reports overview  
• Visit report Create/edit  
• Overview page

---

## Bug #20512: [Team] 'Add enterprise' and delete buttons have wrong colours on edit enterprises if user visits Order or Knowledge section before

- **URL:** [20512](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20512)
- **State:** New
- **Area:** Digital-Services
- **Tags:** FE; PBI; Team; Web
- **Created:** 2026-03-25T16:40:07.133Z
- **Changed:** 2026-03-30T12:37:23.08Z

### Repro Steps

Env: dev 

 
Preconditions: 
• User has permissions to edit team members 
• Log out from the system if you were logged in before 
  
 
Steps: 
• Log into Koppert.One as user from preconditions 
• Open Orders or Knowldge pages at first 
• Open Organization > Team  
• Open details of a team member who logged in user cannot edit (e.g. if user is Grower, then they can't edit Admin) 
• Open 'Enterprise' tab 
• Press 'Edit' button 
• Verify colours of  '+Add enterprise' link and delete (bin) button 
 Actual result: '+Add enterprise' link and delete (bin) button have dark green colour

Notes:1) The colour for '+Add enterprise' is changed to correct on hover 2) The colours are changed to correct after the page is refreshed 
3) This seems to happen when the user logs out and then logs back in  

 

 

 

 
Expected result: Colours should be light green for '+Add enterprise' link and red for the delete (bin) button 

Figma

---

## Bug #20616: Create visit report: Building complement is separated by comma, not dash in 'Select location' dropdown

- **URL:** [20616](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20616)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-27T11:53:54.017Z
- **Changed:** 2026-03-30T08:36:49.743Z

### Repro Steps

Env: dev 
 
3.5.0_OTA_2iPhone Xs Max iOS 18.1  
Samsung Galaxy A52 Android 14 
 
Preconditions: 
• User has permissions to view the visit reports list and create a visit report 
• Enterprise with building complement in location is added to the user, e.g. Hortalan Med, S.L.

 
 Steps: 
• Open Visit reports > Ensure to select the enterprise with the building complement 
• Create visit reports > Click on 'Select location' dropdown
 
• Verify locations with the building complement 
 Actual result: Building complement is separated by a comma

 

 
Expected result: Building complement should be separated by a dash (as it is now on 'Orders')

---

## Bug #20613: The file name is not displayed after saving an image, dates are not deleted after deleting a file on Admin panel

- **URL:** [20613](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20613)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-27T09:38:53.663Z
- **Changed:** 2026-03-27T15:02:31.927Z

### Repro Steps

STR:• Open Admin panel 
• Open Subsidiaries ->select some subsidiary for which banner has never been uploaded before-> 'Planner banner' tab 
• Upload an image for banner 
• Set date for today and start time in one hour 
• Click on the 'Save' button 
• Check file name in 'Upload' field 
• Click on the 'Delete' button 
• Check 'Start date' and 'End date' fields 
 Actual result: 1. the file name is not visible in the field, it appears after refreshing a page.
                         2. Start and end date fields are not cleared after clicking on the 'Delete' button. 

 
Expected result: File name is visible in the Upload field, Start and end date fields are  cleared after clicking on the 'Delete' button.

---

## Bug #20605: Create visit report: Discard/Create buttons do nothing when input field is active and keyboard is shown on iPhone

- **URL:** [20605](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20605)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-26T14:39:23.63Z
- **Changed:** 2026-03-27T14:01:51.16Z

### Repro Steps

Env: dev
 
 
3.5.0_OTA_1

iPhone Xs Max iOS 18.1 

 
Preconditions: 
• User has permissions to view the visit reports list and create a visit report 
 Steps: 
• Open Visit reports > Create visit reports > Select any location 
• Tap in the 'Title' field, so it becomes active, and the keyboard appears 
• Do not type anything and press the Discard / Create visit report buttons 
• Repeat steps 2-3 with the 'General notes' field 
 Actual result: Nothing happens -> iPhone_Create report_Buttons do nothing.mp4 
 

Notes: 
1) This doesn't happen on Samsung Galaxy A52 Android 14
2) When we type at least one symbol in the 'Title' or 'General notes' fields, then the buttons work 
3) Based on the investigation, this seems to happen only on iPhone Xs Max

 
Expected result: Buttons should work

---

## Bug #20608: [Cultivar] Observation is not displayed in cultivar if it added before the cultivar saving

- **URL:** [20608](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20608)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-26T15:54:54.37Z
- **Changed:** 2026-03-27T12:09:18.067Z

### Repro Steps

Environment:  dev 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Visit Report list is opened  
• Steps: 
  
• Click on Create visit report button  
• Click on Cultivar -> Add name -> Save
 
• Click on Cultivar again  
• Enter name -> not to save 
 
• Click on Observation -> Select some 
• Click on tick to save the last cultivar  
• Pay attention to the observation  
  
Actual result: Observation is not displayed in cultivar if it added before the cultivar saving 
Expected result: should be displayed

---

## Bug #20606: 'Create visit report' button is enabled for enterprise with no locations on the create visit report page

- **URL:** [20606](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20606)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; PBI; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-26T14:49:04.923Z
- **Changed:** 2026-03-27T11:44:32.567Z

### Repro Steps

Env: dev 
3.5.0_OTA_1iPhone Xs Max iOS 18.1
Samsung Galaxy A52 Android 14
 
 
Preconditions: 
• User has permissions to view the visit reports list and create a visit report 
• User has an enterprise added with no locations, e.g. Van Iperen B.V. (VMS) 
 Steps: 
• Open Visit reports > Ensure to select the enterprise with no locations in the enterprise selector 
• Press 'Create visit reports' button 
• Verify 'Create visit report' button on the create visit report page 
 Actual result: 'Create visit report' button is enabled (nothing happens when clicking on it which is expected)

 

 
Expected result: 'Create visit report' button should be disabled (similar to a case when the location is not yet selected)

---

## Bug #18481: Wrong sorting of orders on orders list

- **URL:** [18481](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18481)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Blocked by F&O; FE; Regression; Web
- **AssignedTo:** Stanislav Iliashchuk
- **Created:** 2025-12-22T09:55:38.64Z
- **Changed:** 2026-03-27T11:01:45.96Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin / ordered + grower role + 4Evergreen Steenbergen B.V.
 
 Steps: 
• Open orders list on web 
• Scroll down to week 2 
  
Actual result: Wrong sorting of orders on orders list
 
Expected result:  Orders are sorted correctly

---

## Bug #20607: [Cultivar] Strip where cultivars are placed are not fully displayed (as on design)

- **URL:** [20607](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20607)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-26T14:58:04.72Z
- **Changed:** 2026-03-27T10:52:33.117Z

### Repro Steps

Environment:  dev 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Visit Report list is opened  
• 
Steps: 
  
• Click on Create visit report button  
• Click on cultivar 
• Pay attention to the Strip where cultivars are placed 
  
Actual result: Strip where cultivars are placed are not fully displayed (as on design) 

 

 
Expected result: should be displayed to the end of the screen

---

## Bug #20604: [Cultivar] VR can be created without Cultivar saving

- **URL:** [20604](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20604)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-26T14:04:54.46Z
- **Changed:** 2026-03-27T10:48:02.53Z

### Repro Steps

Environment:  dev 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Visit Report list is opened  
• Steps: 
  
• Click on Create visit report button  
• Add some name  
• Add cultivar -> not to save 
• Click on Create Visit report button  
• Pay attention to the cultivar  
  
Actual result: VR can be created without Cultivar saving 
Expected result: Red border should appear around the field (please, look at the web) TBD

---

## Bug #20492: It's not possible to update an image, 'Save' and 'Cancel' buttons are inactive

- **URL:** [20492](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20492)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-25T13:41:54.183Z
- **Changed:** 2026-03-27T08:58:53.89Z

### Repro Steps

STR: 
 
• Open Admin panel 
• Open Subsidiaries ->select some subsidiary-> 'Planner banner' tab 
• Upload an image for nabeer -> Save 
• Do not leave a page 
• Upload a new image 
 Actual result: The second uploaded image is not possible to save, 'Save' and 'Cancel' buttons are inactive

 
Expected result: the uploaded image can be saved, buttons are active

---

## Bug #20611: Changing app language does not change the language of Form Errors until reload

- **URL:** [20611](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20611)
- **State:** New
- **Area:** Digital-Services
- **Tags:** FE; Localization; QualityAssurance; Web
- **Created:** 2026-03-27T08:47:11.15Z
- **Changed:** 2026-03-27T08:49:11.243Z

### Repro Steps

Environment:  dev, stage, prod 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Visit Report lists is displayed 
  

Steps:
 
• Change the language of the app in My Profile. 
• Go to any form that has validation - Visit Report in the example screenshot. 
• Have the form in an invalid state and try to submit it. 
• Observe the error messages. 
 Slack: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1774538419742789

Actual: the error messages are in the previously selected language.

Expected: the error messages are in the last selected language.

---

## Bug #20440: The data is cut on graph if visit report is created for today's date (end of week)

- **URL:** [20440](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20440)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Analysis; Analysis-Graph; BE; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-20T10:53:04.643Z
- **Changed:** 2026-03-26T16:31:22.25Z

### Repro Steps

Pre conditions 
 
 
Exploron Corporation enterprise is selected 
Analysis page is opened 
 
STR: 
 
• Create a few Visit reports with scoutables for current week, specifically end of week 
• Check behaviour on graph
 
 Actual result: The data is cut 

Expected result: the data is properly visible on graph, some spacing is added

---

## Bug #20445: The title is cut on graph if Polish language is selected

- **URL:** [20445](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20445)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Analysis; Analysis-Graph; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-23T11:07:44.617Z
- **Changed:** 2026-03-26T14:06:10.05Z

### Repro Steps

STR:
• Select Polish language 
• Check graph on Analysis page 
 Actual result:  
 

Expected result: title is not cut

---

## Bug #20446: The data on graph is not visible when selecting it

- **URL:** [20446](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20446)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Analysis-Graph; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-23T11:43:07.71Z
- **Changed:** 2026-03-26T13:57:32.91Z

### Repro Steps

STR: 
• Open Analysis page 
• Select data on graph for copying 
  

Actual result: The data on graph is not visible when selecting it

 

Expected result: data is visible when it's selected

---

## Bug #19595: Day where deadline has already passed is available for ordering

- **URL:** [19595](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19595)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-17T12:40:39.287Z
- **Changed:** 2026-03-26T12:18:11.1Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One  
• Entr has a few locations 
• NL6 Entr is selected -> 4Evergreen Steenbergen B.V.  
• Current day is 17-02 
• Current time 14:05 (Kyiv) 
• Planner is displayed  
• Order creation is displayed 
 Steps: 
• Pay attention to the first available day for ordering on Planner and Order creation 
  
Actual result: Day (20.02) where deadline has already passed is available for ordering 
 
 
Expected result: should be disabled for ordering

---

## Bug #20484: Banner is visible on Planner before start time that was set up on Admin panel

- **URL:** [20484](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20484)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; PBI; Planner; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-25T10:46:23.807Z
- **Changed:** 2026-03-26T11:04:30.157Z

### Repro Steps

STR:
 
• Open Admin panel 
• Open Subsidiaries ->select some subsidiary-> 'Planner banner' tab 
• Upload an image for banner 
• Set date for today and start time in one hour 
• Make banner visible for 1 hour 
• Check behaviour 
 Actual result: banner is visible on Planner immediately, not in one hour as it was set up (according to NL time)

 

Expected result: banner becomes visible on Planner at the start time that was selected on Admin panel according to NL time

---

## Bug #20476: The banner is not displayed on Planner after saving an image on Admin panel

- **URL:** [20476](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20476)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Planner; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-25T09:32:31Z
- **Changed:** 2026-03-26T10:41:01.897Z

### Repro Steps

STR: 
• Open Admin panel 
• Open Subsidiaries ->select some subsidiary-> 'Planner banner' tab 
• Upload an image -> Save 
• Check banner on Planner 
 Actual result: The banner is not displayed

 
Expected result: The banner is displayed on Planner

---

## Bug #20501: The incorrect error message appears if updating time in 'End date' field manually

- **URL:** [20501](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20501)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-25T14:42:10.637Z
- **Changed:** 2026-03-26T10:33:52.87Z

### Repro Steps

STR: 
 
• Open Admin panel 
• Open Subsidiaries ->select some subsidiary-> 'Planner banner' tab 
• Upload an image for banner 
• Set date in the 'Start date' field 
• Set the proper date in the 'End date' field 
• Edit date and time in the 'End date' field manually 
• Check behaviour 
 Actual result: the error appears however it shouldn't be there since date and time are set correctly

 
 

Expected result: no error is displayed, and the manual input is disabled

---

## Bug #20477: Data in 'Planner banner' tab is not translated

- **URL:** [20477](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20477)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-25T10:00:13.15Z
- **Changed:** 2026-03-26T10:32:30.36Z

### Repro Steps

Pre conditions
Polish language is selected 

 
STR: 
 
• Open Admin panel 
• Open Subsidiaries ->select some subsidiary-> 'Planner banner' tab 
• Check translations 
 Actual result: Data is not translated

 
 

 
Expected result: data is translated to Polish language

---

## Bug #20333: Scoutable can't be saved after removing previous one

- **URL:** [20333](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20333)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Visit report; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-12T10:52:17.637Z
- **Changed:** 2026-03-26T09:41:50.497Z

### Repro Steps

Environment: stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Visits report list is displayed -> Visit Report 1 has already created with:
- attachments in Notes 
- cultivar 1 + scoutables + attachments 
- cultivar 2 + scoutable

 
 Steps: 
• Click Visit Report 1  -> Edit  
• Remove scoutable from cultivar 2  
• Add a new scoutable  
• Click on Save button 
• Repeat with a new cultivar -> Cultivar 3 
• Pay attention to the scoutables 
  
Actual result: Scoutable can't be saved after removing previous one  
 
Expected result: Should be saved

---

## Bug #20419: Error is not handled after deleting the Visit report that has been already deleted

- **URL:** [20419](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20419)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-17T14:41:10.033Z
- **Changed:** 2026-03-26T09:34:31.923Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has Visit Report 1 Steps: 
  
• Click on Visit Report 1 name on WEB to see VR details 
• Visit Report 1 deleted by another user on mobile or web -> Save 
• Click on trash icon on Visit Report 1 on WEB -> Confirm 
• Pay attention to the Visit report 1 NOTE: the same for edit  
  
Actual result:  
• Error is not handled  
• Visit report details view continues displaying  
• User can edit and delete VR that has been already deleted 
• User doesn't redirects to Visit report list  
  
 
Expected result:  
• Error should be handled 
• User should redirect to Visit report list

---

## Bug #20469: [Team] 'Select enterprise' dropdown instead of 'Add enteprise' is shown after an enterprises was added

- **URL:** [20469](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20469)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Team; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-24T16:14:47.783Z
- **Changed:** 2026-03-26T08:59:24.51Z

### Repro Steps

Env: dev 
 
Preconditions: 
• User has permissions to edit team members 
• User is logged into Koppert.One 
• User is on Organization > Team 
  
 
Steps:

See attached video Select dropdown_Not Add enterprise.mp4
 
• Open details of a team member who logged in user can edit (e.g. if user is Grower, then they can edit Grower and Scout) 
• Both users should have at least 2 enterprises in common 
• Open 'Enterprises' tab  
• Press 'Edit' button 
• Press 'Add enterprise' 
• Select any enterprise in the list and press 'Save' -> toast message is shown and enterprise is added 
• Press 'Edit' button again 
 Actual result: 'Select enterprise' dropdown is shown 

 
Expected result: 'Add enterprise' should be shown 

Note: 'Add enterprise' is shown after pressing 'Cancel' or refreshing the page

---

## Bug #20466: [Team] Error when deleting the last enterprise from the team member details and pressing 'Save'

- **URL:** [20466](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20466)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Team; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-24T12:13:20.443Z
- **Changed:** 2026-03-25T16:16:51.82Z

### Repro Steps

Env: dev 
 
Preconditions: 
• User has permissions to edit team members 
• User is logged into Koppert.One 
• User is on Organization > Team 
  
 
Steps: 
• Open details of a team member who logged in user can edit (e.g. if user is Grower, then they can edit Grower and Scout) 
• Open 'Enterprises' tab 
• Press 'Edit' button 
• Add at least one enterprise to the user if none were added before 
• Delete all enterprises from the tab one by one  
• Once all enterprises are deleted, press 'Save' button 
 Actual result: Error is shown

 

 
Expected result: 
• User shouldn't be able to delete the last/only enterprise on the list 
• Delete button should be disabled with a hover tooltip with the message: &quot;Users must have at least 1 enterprise link&quot;

https://koppertplatform.slack.com/archives/C0464PF164W/p1774351215134109

---

## Bug #20465: [Team] Incorrect sorting of enterprises on the 'Enterprises' tab and in the  'select enterprise' dropdown

- **URL:** [20465](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20465)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Team; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-24T12:08:17.223Z
- **Changed:** 2026-03-25T16:11:58.137Z

### Repro Steps

Env: dev 
 
Preconditions: 
• User has permissions to edit team members 
• User is logged into Koppert.One 
• User is on Organization > Team 
  
 
Steps: 
• Open details of a team member who logged in user can edit (e.g. if user is Grower, then they can edit Grower and Scout) 
• Open 'Enterprises' tab 
• Press 'Add enterprise'  
• Verify sorting of enterprises in the 'Select enterprise' dropdown -> See Actual result 
• Add some enterprise from the end of the list (with the name that starts from Z) and save 
• Then add another enterprise from the beginning of the list (with the name that starts from A or numbers) and save 
• Verify the sorting of the added enterprises on the 'Enterprises' tab 
 Actual result: 
 
Step 4: Enterprises in 'Select enterprise' dropdown are sorted based on how they were added to the logged-in user (my guess)

Step 7: Enterprises are sorted based on how they were added by the logged-in user

 

 
Expected result: All enterprises should be sorted alphabetically in the 'Select enterprise' dropdown and on the 'Enterprises' tab

---

## Bug #20464: [Team] Incorrect enterprise name shown in the modal when selecting enterprise in the dropdown and pressing on the bin button next to any enterprise

- **URL:** [20464](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20464)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Team; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-24T11:48:40.59Z
- **Changed:** 2026-03-25T16:07:45.16Z

### Repro Steps

Env: dev 
 
Preconditions: 
• User has permissions to edit team members 
• User is logged into Koppert.One 
• User is on Organization > Team 
  
Steps:

Video is attached Delete enterprise_wrong name.mp4 
• Open details of a team member who logged in user can edit (e.g. if user is Grower, then they can edit Grower and Scout) 
• Open 'Enterprise' tab 
• Press 'Edit' button 
• Click on 'Add enterprise'  
• Select any enterprise in the 'Select enterprise' dropdown -> do not save  
• Press the bin button next to any other enterprise 
• Verify the name of the enterprise in the confirmation modal under from 
  
Actual result: Name of the enterprise in the dropdown is shown

 

 
Expected result: Name of the enterprise we're trying to delete should be shown

---

## Bug #20436: [Team] User is not navigated to the details of the newly created user after pressing 'Create' button

- **URL:** [20436](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20436)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Team; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-19T12:57:41.093Z
- **Changed:** 2026-03-25T15:48:14.967Z

### Repro Steps

Env: dev
 
Chrome

Preconditions:
• User has permisssions to see team users list, view team members and create team members 
• User has at least one enterprise added 
• User is logged into the Koppert One 
 Steps: 
• Open Organization > Team 
• Press 'Create team member' button 
• Fill in all required fields (email, name, roles, country) 
• Press 'Create' and then 'Confirm' in the appeared pop-up

Video is attached Create team member_Incorrect redirection.mp4 
 Actual result: Toast message is shown, user sees a blank screen 

 
Expected result: User should be redirected to the  details screen of the newly created user

Note: the link is incorrect, should be /info at the end

---

## Bug #20462: [Team] 'Edit' button is available when user views own profile on 'Teams' page

- **URL:** [20462](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20462)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Team; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-24T11:40:16.763Z
- **Changed:** 2026-03-25T15:46:20.24Z

### Repro Steps

Env: dev 
 
Preconditions: 
• User has permissions to edit team members 
• User is logged into Koppert.One 
• User is on Organization > Team 
• User doesn't have koppert email ( 
  
Steps: 
• Find your own user on 'Team' page 
• Open details of your own user 
• Open 'Enterprises' tab 
 Actual result: 'Edit' button is available and user can edit enterprises on their own profile

Expected result: 'Edit' button shouldn't be available

Scenario 4: Edit button on a team member is hidden Given the Organisation Team member enterprises tab is open 
/*When observing the team member who has a role of advisor, admin, local admin, allowed country advisor, basic user or orderer ( if scout or grower is logged in)*/ 
Or when logged in user observes his own profile enterprises list 
Then edit button is hidden on enterprise tab

---

## Bug #20459: [Team] 'Edit' button (disabled) is available when logged in user can't edit a team member

- **URL:** [20459](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20459)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Team; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-24T11:35:14.933Z
- **Changed:** 2026-03-25T15:44:25.61Z

### Repro Steps

Env: dev 

 
Preconditions: 
• User has permissions to edit team members 
• User is logged into Koppert.One 
• User is on Organization > Team 
  

 
Steps: 
• Open details of a team member who logged in user cannot edit (e.g. if user is Grower, then they can't edit Admin) 
• Open 'Enterprise' tab 
• Verify 'Edit' button 
 Actual result: Disabled 'Edit' button is available 

 

 
Expected result: 'Edit' button shouldn't be available 

Scenario 4 from the PBI

When observing the team member who has a role of advisor, admin, local admin, allowed country advisor, basic user or orderer ( if scout or grower is logged in) 
Then edit button is hidden on enterprise tab

---

## Bug #20475: The notification is absent after saving a banner on Admin panel

- **URL:** [20475](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20475)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-25T09:27:15.597Z
- **Changed:** 2026-03-25T12:46:09.94Z

### Repro Steps

STR:
 
• Open Admin panel 
• Open Subsidiaries ->select some subsidiary-> 'Planner banner' tab 
• Upload a banner -> Save 
• Check behavior 
 Actual result: there is no notification after saving a banner 
Expected result: 'Successfully saved' message is displayed after saving a banner

---

## Bug #20365: Me request is not invalidated when enterprise properties are changed during sync

- **URL:** [20365](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20365)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** Production; QualityAssurance; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-16T14:49:01.31Z
- **Changed:** 2026-03-25T11:29:39.15Z

### Repro Steps

STR:
• Go to the Admin panel (look at customer C-003552)
 
• Do the manual sync 
• Observe behaviour 
 Actual result: The enterprise is blocked for users until updating me using My profile page. So the issue is in invalidating cached me request in syncs ( both manual and night).
Expected result: The enterprise is unblocked after sync, and users are able to make orders

Conversation in Slack: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1773301495729059

---

## Bug #20438: The Scoutable + life stage is not treated as a separate element on graph

- **URL:** [20438](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20438)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Analysis; BE; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-19T14:19:26.35Z
- **Changed:** 2026-03-24T15:40:45.4Z

### Repro Steps

Pre conditions

 
4Evergreen Terneuzen 1 B.V.  enterprise is selected
 
Analysis page is opened 

 
STR: 
• Open Visit report for Week 6
 
• Check that 'Californische trips' scoutable is added to Observations
 
• Open Visit report for Week 11 
• Check that 'Californische trips- adult'  is added to Observations

3. Check data on the graph for Week 11
 
  

 
Actual result:  
• 'Californische trips- adult' element is missing on graph. 
 
• It's not separated from 'Californische trips' scoutable, and shows data in one merged line 
 

Expected result: 
• 'Californische trips- adult' is displayed as a separate element on graph.  
• It has the same color as 'Californische trips'scoutable

---

## Bug #20447: Incorrect sorting on Visit Reports list (correct in DB but wrong in response)

- **URL:** [20447](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20447)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-23T11:59:22.627Z
- **Changed:** 2026-03-24T10:12:34.863Z

### Repro Steps

Environment:  Dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One 
 
• User created the visit reports in this order:

 
• Visit Reports list is displayed 
 Steps: 
• Pay attention to visit reports sorting  
  
Actual result: Incorrect sorting on Visit Reports list (correct in DB but wrong in response)
 
 
Expected result: Should be as in DB

---

## Bug #19411: Email notification about visit report is never getting delivered for some emails

- **URL:** [19411](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19411)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** Automation; Visit report
- **AssignedTo:** Anatolii Husakovskyi
- **Created:** 2026-02-10T22:03:09.487Z
- **Changed:** 2026-03-24T07:34:33.797Z

### Repro Steps

• Create visit report with email notification set to vs3oym+c5xsstf11lckgxfj43v70dezw4vrgy7zly8@guerrillamail.com 
• observe network  
 Expected result:
/api/v1/visit-reports/{id}/send-notification should success

Actual result
It returns 429 or 504 error

---

## Bug #16066: UI cursor is displayed when Enterprise is  has been already selected when switching to another tab

- **URL:** [16066](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16066)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Enterprise; FE; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-08-27T12:31:58.95Z
- **Changed:** 2026-03-23T13:48:55.84Z

### Repro Steps

Environment:  dev. 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened on both browsers  
• Some enterprise is selected 
 Steps: 
• Expand Enterprise drop- down 
• Switch to another tab  
• Open the tab with Koppert again 
• Pay attention to the UI cursor  
  
Actual result:  UI cursor is displayed when Enterprise is  has been already selected when switching to another tab 
 
Expected result: UI cursor should NOT be displayed when Enterprise is  has been already selected when switching to another tab

---

## Bug #20429: Search field is moved and displayed in the middle of the visit reports list on Android

- **URL:** [20429](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20429)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-18T15:42:44.12Z
- **Changed:** 2026-03-23T10:20:11.637Z

### Repro Steps

Environment: pre-prod 
Samsung Galaxy A35 5GSM-A356B/DSVersion 14
 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has a few Visit Reports 
• Visit Reports list is displayedSteps: 
  
• Scroll to the end  
• Click on any Visit Report on the bottom 
• Click on Back arrow 
• Click on any Visit Report on the bottom 
• Scroll up 
• Pay attention to the Search field 
  
Actual result: Search field is moved and displayed in the middle of the visit reports list on Android

 
 
Expected result: Search field should not displyed at the middle of the page

---

## Bug #20410: Sales person continues to display but Enterprises (related to this sales person) were unlinked

- **URL:** [20410](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20410)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; BE; QualityAssurance
- **AssignedTo:** Josiah Gayman
- **Created:** 2026-03-17T12:27:29.74Z
- **Changed:** 2026-03-23T09:25:36.987Z

### Repro Steps

Environment:  prod 
 
Preconditions:• Arie verloop user has Admin + Allowed Country Advisor roles - 
• Arie verloop logged in Koppert One 
• Arie verloop  has koppert.nl email to add/change sales person 
• Arie Verloop sales person (001201) has more than 300 Enterprises 
 
• Admin is displayed -> Users -> Arie verloop detailsSteps: 
  
• Pay attention Lick to Sales Person -> Arie Verloop is added  
• Click on Enterprises tab ->  Enterprises are not displayed 
  
• Click on Users  
• Select another user with koppert.nl 
• Click on this user -> Edit  
• Enter Arie Verloop or 001201 in Sales person search  
• Pay attention to the results 
Slack -> https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1773220060860929 
  
Actual result:  
• Enterprises are unlinked although the sales person is still added 
• Sales person Arie Verloop isn't found during the searching by another user

 
  
Expected result:  
• Enterprises should NOT be unlinked although the sales person is still added 
• Sales person Arie Verloop should be displayed in search (TBD)

---

## Bug #20426: The chart is moved to a right a bit, and doesn't stick to one line

- **URL:** [20426](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20426)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Analysis; Analysis-Graph; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-18T10:59:47.547Z
- **Changed:** 2026-03-20T15:57:38.107Z

### Repro Steps

STR:

• Open Analysis page 
• Check the placement of chart 
 Actual result:

Expected result:

---

## Bug #19348: Users loosing access to accounts [stage]

- **URL:** [19348](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19348)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** Automation; Login; Web
- **AssignedTo:** Anatolii Husakovskyi
- **Created:** 2026-02-05T09:21:45.037Z
- **Changed:** 2026-03-20T13:47:04.707Z

### Repro Steps

4 feb 2026 at 3:35 PM I've lost access to all existing accounts on Stage. 
Some users didn't loose it.  

Affected accounts:
• ahusakovskyi@koppert.nl 
• anatolii.husakovskyi@gmail.com 
• khdbznphajdhfoq@guerrillamail.com
 
 Users who lost access can't restore password, backend claims &quot;user doesn't exist&quot;, but on user creation attempt with one of the emails above, backend claims &quot;user already exist&quot;
More context: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1770215872975909

---

## Bug #20427: QR code for Timing expert doesn't open the mobile app

- **URL:** [20427](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20427)
- **State:** Done
- **Area:** Digital-Services
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-18T13:02:48.353Z
- **Changed:** 2026-03-19T13:57:15.133Z

### Repro Steps

STR: 
• Scan QR code 
• Check behaviour 
 Actual result: It doesn't open the mobile app after scanning 

Expected result: The mobile app is opened after scanning the QR code

---

## Bug #20190: Error messages are not handled when we receive error from F&O

- **URL:** [20190](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20190)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-09T10:29:12.363Z
- **Changed:** 2026-03-19T10:09:58.187Z

### Repro Steps

Env: dev 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Organizations -> Location page is opened 
• F&O = 500 or 
F&O sends some error 
 
 Steps: 
• Enter inf in required fields 
• Click on Create location  
• Pay attention to the toast message 
 Actual result: Something went wrong is displayed 
 
Expected result:  (TBD)

---

## Bug #20191: Inf continues displaying after clicking on 'Discard' on leave guard

- **URL:** [20191](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20191)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-09T12:32:09.267Z
- **Changed:** 2026-03-19T08:23:14.967Z

### Repro Steps

Env: dev 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Organizations -> Location page is opened 
  
 
Steps: 
• Click on Create location  
• Enter some inf in some field 
• Change the Enterprise  
• Click on Discard button  
• Pay attention to the inf in field 
 Actual result: Inf continues displaying after clicking on 'Discard' on leave guard 
 
Expected result:  Inf should be cleared after clicking on 'Discard' on leave guard

---

## Bug #20187: UI Issues related to Create location page

- **URL:** [20187](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20187)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Locations; Organization; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-09T09:42:24.563Z
- **Changed:** 2026-03-19T08:14:41.75Z

### Repro Steps

Env: dev 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened as Admin 
• Organizations -> Location page is opened 
 CASE 1
 
Steps: 
• Click on Create location  
• Pay attention to the field names 
 Actual result: There are differences in PBI, design and implementation
https://www.figma.com/design/0MOYjJmTGL4I9x770Z1sgw/Koppert-One-designs?node-id=9351-7463&p=f&t=yTMG8BplCnTayA4l-0

 
 
Expected result:  From Anya: That is acceptable - we didn't know what fields we had to built thats why design differ 

 

 
CASE 2 
Steps: 
• Click on Create location  
• Enter some inf in one field 
• Click on Create button 
• Pay attention to the field names 
 Actual result: There are differences between field names and field names in warning messages related to lower and upper case letters 
 
Expected result: Names should be same. Only the first word should be capital letter (like on the error message). Zipcode - should be the one word without space. 

CASE 3 
Steps: 
• Enter some inf in one field
()
{}
&quot;
\
|
<>
 
• Click on Create button 
• Pay attention to the fields

Actual result: () {} &quot; \ |<> symbols are forbidden  
   
 
Expected result: Only  &quot; ; ` \ |  should be forbidden. If the rest symbols do not brake F&O i'd leave them allowed.

---

## Bug #20418: Error appears after deleting the Visit report that has been already deleted

- **URL:** [20418](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20418)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-17T14:28:07.74Z
- **Changed:** 2026-03-18T15:44:44.453Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has Visit Report 1 Steps: 
  
• Click on Visit Report 1 name on mobile to see VR details 
• Visit Report 1 deleted by another user on mobile or web -> Save 
• Click on trash icon on Visit Report 1 on mobile -> Confirm 
• Pay attention to the Visit report 1  
  
Actual result:  
• Something went wrong appears  
• Visit report details view continues displaying  
• Trash icon is still active 
• User doesn't redirects to Visit report list  
  
 
Expected result:  
• Success message &quot;Deleted successfully&quot; should be displayed 
• User should redirect to Visit report list

---

## Bug #20428: Location is not added for Timing expert when using WIFI + only this time/while using app options on Android

- **URL:** [20428](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20428)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Android; Mobile; More; pre-prod test; Timing Expert
- **Created:** 2026-03-18T13:18:26.52Z
- **Changed:** 2026-03-18T15:37:35.727Z

### Repro Steps

Environment: pre-prod
Samsung Galaxy A35 5GSM-A356B/DSVersion 14
3.4.0 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One and have permission to see Timing expert  
• User is joined to company WIFI 
Steps: 
  
• Click on More  
• Click on Timing expert 
• Chose only this time or while using app options on native phone Allow location modal  
• Pay attention to the Location  
  
Actual result: Location is not added for Timing expert when using WIFI + only this time/while using app options 
 
Expected result: should be added automatically

---

## Bug #19966: Customer key removes after press sync now button on enterprise details page

- **URL:** [19966](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19966)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Enterprise; QualityAssurance; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-02T08:27:52.157Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

Environment:  prod  
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Admin is displayed -> Enterprises -> US1-C-002257 Entrp with two dashes 
 Steps: 
• Clic on Edit  
• Click on Sync manually button 
• Pay attention to ERP key 
Slack: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1772437745942789 
  
Actual result: ERP key disappears for US1-C-002257

 
Expected result: ERP key should NOT disappear for US1-C-002257 because this Entrp has valid key

---

## Bug #19911: [Sales person] Toast message about mandatory advisor role is shown twice when creating a new user not advisor and adding a sales person

- **URL:** [19911](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19911)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; FE; Regression; User
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-25T15:51:39.26Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

Steps: 
• Log into Koppert.One as a user with Admin role and permission to create users 
• Open Admin > Users 
• Press +New user button 
• Fill in email with @koppert.nl 
• Fill in name field 
• Select Roles = Admin or else but not Advisor 
• Add any sales person 
• Press Create user button  
 Actual result: Toast message 'Salesperson link can only be' appears twice

 
 

 
Expected result: Toast message should be shown once 

 
Note: Toast message is shown once (correct behaviour) on edit user screen

---

## Bug #19902: 'Open' status is displayed for 'Cancelled' order on order details

- **URL:** [19902](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19902)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; Orders; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-25T13:03:36.66Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

Environment:   stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened -> Mode On  
• User has order with Product 1/2 
• Enterprise is A. de Bruijn & Zn BV-Loc. Maasland (H) 
 Steps: 
• Click on View details  
• Click on trash icon for Product 1/2 -> Save 
• Click on Confirm on leave guard  
• Pay attention to the order status 
  
Actual result:  
• Status: &quot;OPEN&quot; is displayed in response for Cancelled order after cancellation  
• Status: &quot;OPEN&quot; doesn't change to Cancelled on Orders details  
  

 

 

 

 
Expected result: Cancelled should be displayed

---

## Bug #19900: Planner and Orders: Building complement is not shown in locations

- **URL:** [19900](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19900)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Locations; Regression
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-25T10:52:37.64Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

Preconditions:
 
• Enterprise with location(s) with building complements is added to the user

 
• Some orders for locations with building complements exist for this enterprise
 
• User has permissions to view planner and orders 
 Steps: 
• Login to Koppert.One as user from preconditions 
• Select enterprise from preconditions 
• Navigate to Order > Planner and Order > Orders 
• Verify building complement is shown in following places:
- Planner Order Details popup
- Location filter- Orders > Order Details
 
 Actual result:  
Building complenet is not shown 

 

 

 
Expected result:
- Added Building Complement is shown next to location name separated by - (dash) in Planner Order details popup- Added Building Complement is shown next to location name separated by - (dash) in Orders Order details page- Added Building Complement is shown next to location name separated by - (dash) in the Location filter

---

## Bug #19898: 'Location is archived' appears for available for editing order due to 'shippingAddressId' doesn't match with 'locationName'

- **URL:** [19898](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19898)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Order List; Orders; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-25T09:45:04.953Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Orders details are opened:
- NL6-SO00285660
- NL6-SO00289994 
 Steps: 
• Clic on Edit  
• Change the value -> Save 
  
Actual result:  
• 'Location is archived' appears for available for editing order due to 'shippingAddressId' doesn't match with 'locationName'

 
  

 
Expected result:  
 
• 'Location is archived' should not appear for available for editing order  
• shippingAddressId' = 'locationName'

---

## Bug #19894: Visit report: Added cultivar/observations are not removed on the visit report when location changed and 'Discard' pressed on the leave guard

- **URL:** [19894](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19894)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Regression; Visit report
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-25T09:10:18.607Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

Preconditions: 
• Enterprise A with two locations where no cultivar/observations previously added exists 
• Enterprise is added to the user X 
 Steps: 
• Login as user X  
• Navigate to Knowledge > Reports  
• Select enterprise A from preconditions in the dropdown 
• Select location where no cultivar/observations are added

 
• Add some cultivar/scoutables 
• Change location to another one (ensure that this location has no cultivar/scoutables) -> leave guard appears which is expected
 
• Press 'Discard' in the appeared leave guard 
• Verify cultivar/scoutables 
 Actual result: Cultivar/scoutables from step 5 are still shown

 

 
Expected result: Cultivar/scoutables from step 5 should be removed

Note: this issue was found in scope of regression, but is related to 18301 user story

---

## Bug #19888: Location with 'Invoice' purpose is displayed on the Locations page

- **URL:** [19888](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19888)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Locations; Organization; Regression; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-24T15:59:06.69Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

Pre conditions:
User is logged in to Koppert One 
305 Farms Enterprise is selected 

 
STR:
• Open Organization ->  Locations page 
• Check locations in the list 
 Actual result: Location with 'Invoice' purpose is displayed on the Locations page

Expected result: only locations with purpose business and delivery are displayed

---

## Bug #19887: Sales person and  Enterprises are removed from user  after language changes

- **URL:** [19887](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19887)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; Regression; User
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-24T14:17:35.567Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
• SSO (koppert.nl) user details is displayed + Advisor role 
• Adje Hooijdonk- Botermans, van - 001160 has more than 700 entrp
 
 
 Steps: 
• Clic on User with SSO email -> Edit  
• Add 001160 sales person -> Save 
• Click on My profile 
• Change the Language -> Save 
• Pay attention to enterprises and sales person in User tab 
  
Actual result:  
• Sales person is removed from user  
• Enterprises are unlinked from user  
  
Expected result:  
• Sales person should not removed from user  
• Enterprises should not unlinked from user

---

## Bug #19885: The error appeared during user deletion, a user was not deleted, and is not accessible from Admin panel anymore

- **URL:** [19885](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19885)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-24T10:47:21.767Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

Pre conditions

User 1 is logged in as Admin
User 2 is logged in another browser window

STR:

 
• Go to Admin panel as Admin -> Users 
• Search for User 2 
• Open User's page -> delete user 2 
 Actual result:   
1.'Something went wrong' error appears. 
2. User is not deleted.
3. Empty page is displayed when Admin opens the User's 2 page. Also, it shows that the enterprise is unlinked, but it's not for a user.

4. User 2 is still logged in to Koppert One and can do orders.
5. User 2 cannot change language, the error appears

Expected result: user 2 was deleted and logged out from Koppert One.

Note: I was able to reproduce it only 1 time for now.

---

## Bug #19049: Order without products are displayed with 'Open' status -> US1-SO00282996

- **URL:** [19049](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19049)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Orders; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-23T09:48:52.663Z
- **Changed:** 2026-03-18T11:17:36.063Z

### Repro Steps

CASE 1
 
Environment: dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Orders is displayed  
 Steps: 
• Open US1-SO00282996  
• Pay attention to the status and product  
  
Actual result: Order without products are displayed with 'Open' status  
 

 
Expected result: Order without products should NOT be displayed with 'Open' status 

 

CASE 2Environment: stage, dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Planner is displayed  
• F&O = 500 
 Steps: 
• Create some order for the first available day -> Save  
• Delete this order -> Save  
• Create again on the same day -> Save 
• Repeat 1-3 steps several times 
• Wait F&O = 200 
• Pay attention to the the orders that were cancelled 
  
Actual result:  
• Order without products are displayed with 'Open' status  
• Orders can be edited  
  
 
 

 

 

 
Expected result: Order without products should NOT be displayed with 'Open' status and can not be edited

---

## Bug #20216: [Team members] Logged in user with Admin/Local Admin/Advisor role can edit user with Basic role

- **URL:** [20216](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20216)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Team
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-11T11:16:35.8Z
- **Changed:** 2026-03-18T10:12:31.69Z

### Repro Steps

Preconditions: 
• User with Basic role exists in the system
 
• User with Admin role exists in the system 
• User with Admin role can edit team members 
• Both users have the same enterprise added 
 Steps: 
• Log into the system as an Admin user  
• Ensure you have selected the same enterprise that the basic user has 
• Open Organization > Team 
• Find and open details of the Basic user  
• Verify 'Edit' button  
 Actual result: 'Edit' button is available 

 
Note: also reproducible for logged in users (viewers) with Advisor and Local Admin roles

 

 
Expected result: 'Edit' button shouldn't be available when viewing Basic user (Scenario 2.4 from PBI)

---

## Bug #20348: Scoutable life stage is missing on the graph legend

- **URL:** [20348](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20348)
- **State:** Done
- **Area:** Digital-Services
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-12T13:54:05.58Z
- **Changed:** 2026-03-18T09:33:13.16Z

### Repro Steps

STR: 
• Open Analysis page 
• observe a list of scoutables on the graph legend 
  

 
AR: No lifestage is shown near each scoutable name which is inconvenient when multiple scoutable lifestages are included into VR  
ER: scoutable name and a life stage should be shown (if any available). each available lifestage is a separate item on a legend

---

## Bug #20353: [Android] Location permission modal appears again after selecting 'Don't allow' option

- **URL:** [20353](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20353)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Regression; Timing Expert
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-12T16:15:19.497Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Precondition: 
 

User has never granted location permission for Timing Expert before
 

STR:
 
• Open the application -> Navigate to the Timing Expert feature 
• Observe the permission modal 
• Select 'Don't allow' option 
• Observe behaviour 
  
Actual result: Location permission modal appears again 2nd time

 
Expected result: Message: “Location access denied. You can enable location access in your device settings for more accurate timing advice” is displayed after user selects 'Don't allow' option 

Additional scenario (from Yuliya Halamay):

Video is attached Android_Timing_Expert_Locations_Permissions.mp4
• On Android device open Settings >  Location > Koppert One app > Don't allow 
• Open Koppert app > Timing Expert
AR: Modal appears
ER: Modal shouldn't appear, pop-up message about Location access should be shown (as on iOS)

---

## Bug #20349: Create your account page: 'No' value next to the radio button is not visible on iPhone Xs Max

- **URL:** [20349](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20349)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Login; Mobile; Regression
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-12T14:04:32.56Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Env: Stage 3.4.0
 
iPhone Xs Max iOS 18.1 

 
Steps: 
• Open mobile app on the login page 
• Press 'Create an account' button 
• Verify values in 'Are you already a customer?' 
 Actual result: 'No' value is not visible next to the radio button

 

 
Expected result: 'No' value should be visible

Screenshot from Samsung Galaxy A52 Android 14 (it's a bit close to the edge, but visible)

---

## Bug #20344: Timing expert title overlaps Back arrow in e.g. Portuguese

- **URL:** [20344](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20344)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Regression; Timing Expert
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-12T12:57:33.497Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One and have permission to see Timing expert  
• Steps: 
  
• Click on More  
• Select  Portuguese 
• Click on Timing expert 
• Don't allow to use Location  
• Pay attention to the title and back arrow 
  
Actual result: Timing expert title overlaps Back arrow in e.g. Portuguese 

 
Expected result: should not overlap

---

## Bug #20343: [Visit report] [Android] Search field remains active, cursor is blinking after closing the keyboard

- **URL:** [20343](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20343)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Regression; Visit report
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-12T12:52:30.057Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Pre conditions
Device:  Samsung Galaxy A16, Android 15

STR:
• Open Visit repots list  
• Start typing in Search field 
• Delete data 
• Close the keyboard 
• Check Search field 
 Actual result: Search field remains active, cursor is blinking 
Expected result: The search field is not active after closing the keyboard

---

## Bug #20335: [Visit report] Some file formats are not correctly handled

- **URL:** [20335](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20335)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Regression; Visit report
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-12T11:46:17.123Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Pre conditions:

Agricola El Rosal enterprise is selected 

 
STR:
• Open 'Test Report - loyzFuFL' visit report 
• Check attachments 
 Actual result:

Devices: iPhone 13, IOS 26.0.1
                Samsung Galaxy A16, Android 15
• svg file looks broken on iPhone. and not handled on Samsung

 
• Some image is not handled at all on both devices

---

## Bug #20334: Deleted visit report continues displaying after VR details page refreshing

- **URL:** [20334](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20334)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Regression; Visit report; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-12T11:04:45.33Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has Visit Report 1 on the current daySteps: 
  
• Click on Visit Report 1 name on mobile to see VR details
 
• Click on Visit Report 1 name on WEB  
• Click on Delete button 

 
• Switch to mobile 
• Refresh VR 1 details 
• Pay attention to the Visit report 1  
  
Actual result: Deleted visit report continues displaying after VR details page refreshing 

 
Expected result: Deleted visit report should not be displayed (need to clarify)

---

## Bug #20331: UI: Date is not centered and is wrapped across three lines, coma is missed

- **URL:** [20331](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20331)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Regression; Visit report; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-12T10:14:18.46Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Environment:  stage, iOS, Android
 

Samsung Galaxy A35 5GSM-A356B/DSVersion 14iPhone 17 PRO maxiOS 18.6.2

 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has Visit Report 1 on the current day

Steps: 
  
• Pay attention to the Visit reports list
- date on Android 
- coma on iOS and Android 
- wrapping 

 
  
Actual result:  
• Date is not centered on Android  
• coma is missed on iOS and Android  
• Date is wrapped across three lines 
  
 
 

 
Expected result:  
• Date should be centered as on design 
• Coma should be added after months 
• Date should be wrapped across two lines

---

## Bug #20104: 'Location access denied' modal doesn't appear for Basic user each time after opening Timing Expert

- **URL:** [20104](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20104)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Timing Expert
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-03-05T12:43:52.297Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

STR: 
• Login as Basic user 
• Navigate to the Timing Expert feature for the first time
 
• Check that System location permission modal is displayed 
• Tap on “Don't allow” in the system permission modal
 
• Check that 'Location access denied' modal appears 
• Leave a screen 
• Open Timing expert again 
 Actual result: 'Location access denied' modal doesn't appear

Expected result: 'Location access denied' modal appears every time when opening Timing expert screen

---

## Bug #20066: [Visit report] Details are scrolled slowly when adding a big number of attachments on Android

- **URL:** [20066](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20066)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-04T11:17:35.75Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Env: Samsung Galaxy A52 Android 14 
 
Preconditions: 
• User's role has access to the footer and visit reports 
• Visit report with many attachments for scoutables and general notes of different sizes is created, e.g. Agrifirm NWE B.V. Cultivar tabs test (5 tabs)...

 
• Enterprise with the above report is added to the user 
• User is logged into the app 
 Steps: 
• Open visit reports from the footer 
• Open details of the visit report from preconditions 
• Scroll through the visit report 
 Actual result: Visit report is being scrolled slowly and it takes some time for files previews to appear 
 
Expected result: Visit report should be scrolled faster (as on iPhone Xs Max iOS 18.1, videos are attached)

---

## Bug #20065: [Visit reports] Some files cannot be opened on Android

- **URL:** [20065](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20065)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-04T10:55:08.363Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Env: Samsung Galaxy A52 Android 14 

 
Preconditions: 
• User's role has access to the footer and visit reports 
• Visit report with attachments .csv and .doc is created 
• Enterprise with the above report is added to the user 
• User is logged into the app 
 Steps: 
• Open visit reports from the footer 
• Open details of the visit report from preconditions 
• Tap on .csv file 
• Tap on .doc file 
 Actual result: Nothing happens (see attached video)

 

 
Expected result: Files should be opened and available for downloading

---

## Bug #20063: Files can not be downloaded on Android

- **URL:** [20063](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20063)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; PBI; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-04T10:17:15.453Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Environment:  dev, Android 
 
 
Samsung Galaxy A35 5GSM-A356B/DSVersion 14
 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has Visit Report 1 that was reported in C.J.Klep location  
• Visit Report 1 has different files formats in attachments in General notes/Observations:Steps: 
  
• Click on Visit Report 1 to see visit report details 
• Click on any attachment
 
• Try to save the file 
  
Actual result: Files can not be downloaded on Android 
 
 
Expected result: should be downloaded (please, look at the video with Slack downloading)

---

## Bug #20053: Longer name of scoutable with 'Under control' status overlaps with the status name in Visit report details > Observations

- **URL:** [20053](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20053)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-03T16:01:46.697Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Env: iPhone Xs Max, Samsung A52
 

Preconditions: 
• Visit report with cultivar exists for any enterprise 
• Cultivar in this report has observation where added Aardappeltopluis - nymph and status Under control 
• The user's role has access to the visit reports list on mobile
 
• Enterprise with the above visit report is added to the user 
• User is logged into the app  
 Steps: 
• Open 'Visit reports' list from the footer 
• Open details of the visit reports from preconditions 
• Open cultivar tab with the scoutable  Aardappeltopluis - nymph in Under control status from preconditions 
• Verify its view 
 Actual result: Scoutable's name overlaps with the status name 

iPhone Xs Max

 

 
Expected result: Scoutable's name shouldn't overlap with the status name  

 
Notes:  
1) This happens only in Under control status and for this scoutable (due to their names' length) 
2) This doesn't happen much on Android (Samsung A52 and Galaxy S10) in English, below is a screenshot from Samsung A52, but Anthuriumthrips - population almost overlaps with the status there. 

And it happens in the German language on Samsung A52

Samsung A52 English

Samsung A52 German

---

## Bug #20011: Visit reports of the deleted enterprise are still shown on the visit reports list

- **URL:** [20011](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20011)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-02T13:08:47.52Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Environment: dev, iOS, Android 
 
Preconditions: 
• Admin user with permissions to delete enterprises exists  
• User X has a role with permission to view visit reports on mobile. 
• User X is added to an enterprise with created visit reports, e.g. 3 GM Inc or Agrifirm NWE B.V. 
• User X is logged into the app 
 Steps:
• As user X open 'Visit reports' from the footer -> Visit reports of the enterprise from preconditions are shown  
• As Admin user open details of the user X from preconditions in admin panel and delete a linked enterprise 
• As user X navigate to 'More' section -> 'No enterprises' is shown in the selector which is expected 
• Navigate to 'Planner' section > 'No locations found' is shown which is also expected 
• Navigate back to 'Visit reports' section  
 Actual result: Visit reports of the deleted enterprise are still shown (they do not disappear after the page refresh, only after the closing/killing and reopening the app) 

 
Expected result: 'No visit reports' should be shown, user shouldn't see any visit reports if the enterprise is deleted for them 

 
Note: if we have 2 enterprises with visit reports added to the user, navigate to 'Visit reports', delete this selected enterprise from the user, navigate between sections -> enterprise is removed from the selector and its reports are not shown

---

## Bug #19985: [Visit reports] Incorrect aligment for the visit reports on the list

- **URL:** [19985](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19985)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-02T11:10:07.5Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Enviroment: dev, iOS, Android 
 
Preconditions: 
• Visit reports for different dates are created for an enterprise X, including on dates with one number (3 Dec, etc), -> enterprise Agrifirm NWE B.V. 
• User has a role with permission to view visit reports on mobile 
• User has the enterprise X added 
 Steps: 
• Log into the Koppert app as the user from preconditions 
• Open 'Visit reports' section from the footer 
• Ensure to select enterprise X in the selector (if not selected) 
• Verify reports on the list and their alignment 
 Actual result: Reports created on dates like 3 Dec (with one number in the date) aligned more to the left

 

 
Expected result: All reports should be aligned evenly

---

## Bug #19951: [Android] It's not possible to manually add a location if using a location is not allowed on device level

- **URL:** [19951](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19951)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Timing Expert
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-27T15:16:39.147Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Pre conditions:  
User turned off location services on a device

STR: 
• Install the app 
• Login 
• Go to Timing expert -> check that new modal about disabled permissions appears 
• Select 'No thanks' option on modal 
• Check behaviour on Timing expert screen 
 Actual result: The location field is disabled. User cannot enter the location in the field manually.

 
Expected result: user is able to enter location manually if he/she doesn't allow to use GPS

---

## Bug #19950: [Visit reports] Visit on the same date are sorted incorectly based on the time

- **URL:** [19950](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19950)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **Created:** 2026-02-27T15:11:12.543Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Enviroment: dev, iOS, Android 
 
Preconditions: 
• User has a role with permission to view visit reports on mobile 
• User has the enterprise X added 
• Visit reports for this enterprise are created on the same date but on with different time, e.g. Agrifirm NWE B.V. 
• User is logged into the app 

 
 Steps:
 
• Open 'Visit reports' section from the footer 
• Ensure to select enterprise X in the selector (if not selected) 
• Find the visit reports created in preconditions 
• Verify sorting of the visit reports, specifically reports created on the same date  
 Actual result: Visit reports do not show latest on top within the same date 

 
Expected result: Visit reports should show latest on top within the same date

 
 
From the PBI 
Scenario 2: Sorting logic including multiple reports on the same day    Given I have access to enterprise Visit Reports X (25 Aug, 14:30), Y (25 Aug, 10:00), and Z (24 Aug, 9:00) 
  When I view the Visit Reports list 
  Then Report X (14:30) should appear before Report Y (10:00) 
  And Report Y should appear before Report Z (24 Aug)

---

## Bug #19948: [Visit reports] Long address is not wrapped on the visit reports list

- **URL:** [19948](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19948)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit report
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-27T13:29:27.963Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Enviroment: dev, iOS, Android 

 
Preconditions:
 
• An address with a long name is created for an enterprise X, e.g. Agrifirm NWE B.V. 
• A visit report with a location with a long name is created 
• User has a role with permission to view visit reports on mobile
 
• User has the enterprise X added 
 Steps: 
• Log into the Koppert app as the user from preconditions 
• Open 'Visit reports' section from the footer 
• Ensure to select enterprise X in the selector (if not selected) 
• Find the visit report with the long location name from preconditions 
 Actial result: Long address is not wrapped 

 

 

 
Expected result: Long address should be wrapped 
Screenshot from Figma

---

## Bug #19941: Location name disappears from Visit Report after changing the Enterprise in More

- **URL:** [19941](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19941)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-27T10:12:12.21Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Environment:  dev, iOS, Android 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has Visit Report 1 that was reported in C.J.Klep location  
• 

Steps: 
  
• Click on Visit Report 1 to see visit report details 
• Click on More  
• Select another Enterprise  
• Click on VR icon  
• Pay attention to the Location where Visit Report 1 was created 
  
Actual result: Location name disappears from Visit Report view mode after changing the Enterprise in More 
 
 
Expected result: Visit reports list should be opened

---

## Bug #19665: Location doesn't set up in the field after allowing the device's permission if don't allow the webview location permission before that

- **URL:** [19665](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19665)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Timing Expert
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-20T15:10:22.82Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

STR:
• Install the app 
• Login 
• Go to Timing expert -> don't allow to use Location on the device's permission modal 
• Go to the device's settings -> location permission-> set up 'Ask next time' option 
• Open Timing expert 
• Check that web location permission modal appears (not device's)

 
• Choose 'Don't allow option 
• Allow location's permissions on the device's permission modal 
• Check Location field 
 Actual result: The location is not set up since web permission was not allowed. Nothing changes when you choose 'Allow 'permission on the device's permission modal. It's not possible to trigger the web permission modal again.
Only reinstalling the app is needed.
Note: web permission modal might appear randomly, not just the flow that was described in the ticket.

Expected result: there is a way to trigger a web permission modal again so user can allow using the location and feature start working properly.

---

## Bug #19457: Visit report title is not displayed inside visit report

- **URL:** [19457](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19457)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit report
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-13T08:30:29.243Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Environment:  dev 
Build: v.3.3.3 
 
 
Preconditions:• User logged in to Koppert One app as user with permissions to view visit reports 
 Steps: 
• Open Visit report list page 
• Check Visit report title - title is visible 
• Open visit report details page 
• Check title 
  
Actual result: Title is not visible 

 
Expected result: Title should be displayed

---

## Bug #19439: App crashes after opening location selector on specific device

- **URL:** [19439](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19439)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Cool; Mobile; Planner; QualityAssurance
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-12T13:59:38.79Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

STR:
 
• Log in as user (who has linked more than 800 enterprises) to Mobile app
Device: Samsung S24FE  
• Go to Planner 
• Open location selector 
 Actual result: App crashes, a white screen appears

 
Expected result: App doesn't crash

Link to conversation in Slack: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1770887026824479

---

## Bug #19346: Mode off stucks for seconds if switching from mode On to Off adding and selecting a new a new Entrp on WEB

- **URL:** [19346](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19346)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Enterprise; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-05T08:49:53.293Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

Environment:  dev, stage, prod 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On on mobile 
• Admin is opened -> Users on web

Steps: 
  
• Click on user who is logged in on the mobile  -> Enterprises tab 
• Add any e.g. Enterprise 1 -> Save 
• Switch to mobile 
• Click on More  
• Select added on web Enterprise 1 
• Click on Planner 
• Click on Cancel button on Mode On  
• Pay attention to the Locations drop-down  
• Pay attention to the Order mode button 
 
  
Actual result:  
• Mode off stucks for seconds if switching from mode On to Off  
• No orders found.. is displayed in Locations drop-down  
• Order mode button is disabled  
  
Expected result: 
• Mode off should not stuck 
• The first location for selected Entrpr should be displayed 
• Order mode button should be active 
•

---

## Bug #19258: RefreshControl progressViewOffset not working on iOS

- **URL:** [19258](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19258)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile
- **AssignedTo:** Ivan Dutka
- **Created:** 2026-01-30T13:43:20.427Z
- **Changed:** 2026-03-18T09:04:31.503Z

### Repro Steps

RefreshControl progressViewOffset not working on iOS 
 
https://github.com/facebook/react-native/issues/54183

---

## Bug #19302: Persistent CORS failures for some browsers

- **URL:** [19302](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19302)
- **State:** Committed
- **Area:** Digital-Services
- **Tags:** FE
- **AssignedTo:** Stanislav Iliashchuk
- **Created:** 2026-02-04T09:35:32.64Z
- **Changed:** 2026-03-18T08:02:03.137Z

### Description

Sometimes, dev environment BE can be consistently unreachable for a user because of CORS errors. 

 
Clearing cache doesn't help. Other browsers and incognito mode still works.

### Repro Steps

Copied from Description when changed from Task to Bug
Sometimes, dev environment BE can be consistently unreachable for a user because of CORS errors. 

 
Clearing cache doesn't help. Other browsers and incognito mode still works.

---

## Bug #20346: Order update emails are not getting delivered to some emails

- **URL:** [20346](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20346)
- **State:** New
- **Area:** Digital-Services
- **Created:** 2026-03-12T13:17:52.417Z
- **Changed:** 2026-03-17T14:19:48.293Z

### Repro Steps

Email notifications for order updates/deletions are not delivered to Guerrillamail email addresses (e.g., @sharklasers.com), but work correctly for real email addresses (e.g., @koppert.one).

• Set up Guerrillamail inbox:
• Go to https://www.guerrillamail.com
• Note the temporary email address (e.g., random123@sharklasers.com)

• Create test user:
• Create a new user account in Koppert One Stage
• Use the Guerrillamail address as the user's email
• Activate the account

• Create and modify an order:
• Log in as the test user
• Navigate to Planner page
• Switch to Order Mode (toggle on)
• Add quantities to 2-3 products for the same delivery date
• Click &quot;Order&quot; button to create the order
• Confirm the order

• Delete/modify the order:
• In the same Planner view, find the products you just ordered
• Clear the quantity for one product (delete it entirely)
• Set another product quantity to &quot;0&quot;
• Click &quot;Order&quot; button
• Confirm the deletion in the modal

• Check for email:
• Go back to https://www.guerrillamail.com
• Refresh the inbox
• Look for email with subject: &quot;Your order(s) have been updated&quot;

---

## Bug #20209: [Team members] Logged in user with Scout role doesn't see roles in the dropdown when editing Scout team member

- **URL:** [20209](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20209)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Team
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-11T08:46:26.257Z
- **Changed:** 2026-03-11T14:11:04.4Z

### Repro Steps

Preconditions: 
• Two users with Scout role exists in the system 
• One of the Scout users can edit team members 
 Steps: 
• Log into the system as a Scout user with permissions to edit team members 
• Open Organization > Team 
• Find and open details of the Scout user (but not your own/logged in user) 
• Press 'Edit' button ->  only the roles dropdown is editable which is expected 
• Click on the roles dropdown 
 Actual result: Roles dropdown is empty 

 

 
Expected result:  Scout and Grower options should be available in the dropdown

---

## Bug #18779: The order-deadline goes off too early, if the day the order-dealine is ticking for is not an available shipping-date for that customer

- **URL:** [18779](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18779)
- **State:** Blocked
- **Area:** Digital-Services
- **Tags:** Cool; FE; Planner; Production; QualityAssurance; Web
- **AssignedTo:** Tiffany Levens
- **Created:** 2026-01-08T10:04:38.19Z
- **Changed:** 2026-03-11T12:59:52.603Z

### Repro Steps

Environment: prod 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• User has Enterprise with locations 
• Planner is opened  
• User has an unavailable shipping-date  
 Steps: 
• Find a customer with an order-deadline ticking for Monday, and for the same subsidairy, also an order-deadline ticking for Tuesday, wednesday, Thursday or even Friday if that is their only shipping-date.https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1767171262984819 
  
Actual result: The order-deadline is ticking for both Monday and Friday, for the same subsidiary. 

 
 
 

Expected result: The order-deadline can not be ticking for both Monday and Friday, for the same subsidiary.

---

## Bug #18778: An order exists and is not visible on planner when leaving Planner without touching for 45 min

- **URL:** [18778](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18778)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; PRD; Production; QualityAssurance
- **AssignedTo:** Josiah Gayman
- **Created:** 2026-01-08T09:37:21.477Z
- **Changed:** 2026-03-11T11:01:15.257Z

### Repro Steps

Environment: prod 

Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Enterprise -> Harry Wubben Flowers 
• Planner is opened 
 
 Steps: 
• User placed an order at 9:14. 
• They logged in a bit later around 10am to add 4 Chrysopa to the order, but order list didn't show any orders. 
• Customer service communicated via phonecall, that the order did arrive to F&O in full, so all that was left to do was add the 4 Chrysopa. 
• When the customer added the 4 Chrysopa to an empty planner with Customer service on the phone, all order-lines were removed from the order in F&O except for the newly added Chrysopa.
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1767104682830949?thread_ts=1766386093.114689&cid=C08CXQ71EQZ 
  
Actual result: An order existing but not being visible on planner when leaving Planner without touching for 45 min -> NL6-SO00280581 
 
 
Expected result: Should be visible

---

## Bug #16950: [Natutec Scout] The 'Accept' and 'Close' buttons are moved to the bottom and crossing the bottom menu when taking a picture

- **URL:** [16950](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16950)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Mobile; Natutec Scout; PBI
- **AssignedTo:** Paweł Niedzin
- **Created:** 2025-10-09T13:52:19.407Z
- **Changed:** 2026-03-11T10:49:42.757Z

### Repro Steps

Device: Samsung Galaxy A16 
 
Android 15 

Actual result:
 

Expected result: the buttons do not cross the bottom menu

---

## Bug #16947: [Natutec Scout] The empty space under the 'Save' button when keyboard is opened

- **URL:** [16947](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16947)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Mobile; Natutec Scout; PBI
- **AssignedTo:** Paweł Niedzin
- **Created:** 2025-10-09T13:15:55.5Z
- **Changed:** 2026-03-11T10:48:55.117Z

### Repro Steps

Device: Samsung Galaxy A16 
Android 15 

STR:
 
• Tap on the Add scout session button 
• Select location 
• Select department 
• Save the session 
• Open the session 
• Tap in some row -> select some Post -> Observation 
• Tap in the Caterpillars field 
 Actual result:

Expected result: no empty space

---

## Bug #16942: [Natutec Scout] UI issues on different screens

- **URL:** [16942](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16942)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Mobile; Natutec Scout; PBI
- **AssignedTo:** Paweł Niedzin
- **Created:** 2025-10-09T10:48:37.537Z
- **Changed:** 2026-03-11T10:44:35.75Z

### Repro Steps

Device: Samsung Galaxy A16
Android 15 

Case 1 
Actual result: The bottom menu is not greyed out
Note: I've added the screen of 2.15.0 version, so it will be easier to compare and know the expected result

2. Case 2
Actual result: Empty space above the Settings

Case 3:
Actual result: Koppert logo is moved to the bottom and crosses the bottom menu

---

## Bug #2439: Screenshot is empty when user take it from Safari browser

- **URL:** [2439](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/2439)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Analysis; Analysis-Graph; Safari
- **Created:** 2022-12-16T12:26:00.113Z
- **Changed:** 2026-03-11T10:41:50.423Z

### Repro Steps

Steps to reproduce: 

 
• Login as registered user 
• User should have Location and department with data 
• Treatments are configured 
• Go to Analysis page 
• Select Location and Department with data 
• Click on &quot;photo&quot; icon 
• check downloaded file 
 
 
Expected result: 
Graph and Treatment data should be displayed. 

 
actual result: 
File is empty

---

## Bug #19891: The matrix scrolls down when trying to highlight an order value

- **URL:** [19891](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19891)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-25T08:48:27.163Z
- **Changed:** 2026-03-11T10:41:08.64Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Planned is opened 
• User has some order 
 Steps: 
• Try to  highlight an order value 
• Pay attention to order matrix 
  
Actual result: The matrix scrolls down when trying to highlight an order value 

 
Expected result: The matrix should not scroll down when trying to highlight an order value

---

## Bug #19136: ʼCreate order' button is available when permission is turned off

- **URL:** [19136](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19136)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** FE; Order List; Orders; Permissions; Web
- **Created:** 2026-01-26T13:56:57.793Z
- **Changed:** 2026-03-11T10:40:50.333Z

### Repro Steps

Environment:  dev 
 

CASE 1
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Orders list is displayed in tab 1 
• Admin -> Permissions is displayed in tab 2 
 Steps: 
• Leave Orders list without touching on tab 1 
• Turn OFF Create orders from Orders page for all roles on tab 2 -> Save 
• Switch to Orders list on tab 1 
• Click on Create order button  
• Fill in all required fields -> Save 
• Pay attention to the order and create order button  
  
Actual result:  
• ʼCreate order' button is available when permission is turned off 
• Order can be created when user doesn't have permissions 
  
Expected result:  
• ʼCreate order' button is available when permission is turned off 
• Order can be created when user doesn't have permissions

 
 CASE 2Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Enterprise is NL6 
• Solution Finder is displayed in tab 1 
• Admin -> Permissions is displayed in tab 2 
 Steps: 
• Leave Solution Finder without touching on tab 1 
• Turn OFF Create orders from Orders page for all roles on tab 2 -> Save 
• Switch to Solution Finder on tab 1 
• Click on Order button  
• Fill in all required fields -> Save 
• Pay attention to the order and create order button  
  
Actual result:  
• ʼCreate order' button is available when permission is turned off 
• Order can be created when user doesn't have permissions 
  
Expected result:  
• ʼCreate order' button is available when permission is turned off 
• Order can be created when user doesn't have permissions

---

## Bug #16059: Qty disappears after creation and appears again after deleting order in case when changes perform on the last available week next year

- **URL:** [16059](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16059)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** BE; Lag Buster; Planner; Web
- **Created:** 2025-08-26T09:58:28.1Z
- **Changed:** 2026-03-11T10:40:44.597Z

### Repro Steps

Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Planner page is opened 
 Steps: 
• Click data picker 
• Select next year -> 2026  
• Select month -> Aug week 35 -> last available week for ordering next year 
• Create order -> Click on Cancel button -> Click on Discard changes  
• Create order -> Save 
• Pay attention to the qty 
• Delete order -> Save -> Click on Cancel button -> Click on Discard changes  
• Delete order -> Save 
• Pay attention to the qty 
 Actual result:  
• Qty disappears after creation and appears again after deleting in case when changes perform on the last available week next year 
• The last request is not received 
• Deleted order is displayed on Orders List  
  
 
Expected result:  
• Qty should not disappears after creation and appears again after deleting in case when changes perform on the last available week next year 
•  The last request should be received 
• Deleted order should NOT displayed on Orders List

---

## Bug #14212: Double order creation instead of simple ordering

- **URL:** [14212](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14212)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** BE; Lag Buster; Planner; PRD; Production; QualityAssurance
- **Created:** 2025-04-23T14:01:38.823Z
- **Changed:** 2026-03-11T10:40:39.063Z

### Repro Steps

CASE 1

Environment:  dev, stage 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened on both browsers - Client 1- Client 2 
• 500 gets from F&O 
 Steps: 
• Create order 
• Edit the same order  
• Wait when 200 gets from FO 
• Close 'Conflict locations' modal 
• Pay attention to the  order from Step 1 
  
Actual result: Double order creates instead of regular after creating+editing order when 500 gets from FO (please, look at the video in attachments) 

 
 
Expected result: 
• Regular order should be created 
• Order qty should not be sum  
• Only the last qtv after editing should be displayed 
  

CASE 2Environment:  stage 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened 
 
• 500 gets from FO 
 Steps: 
• Create order 
• Wait when 200 gets from FO 
• Pay attention to the  order from Step 1 
  
Actual result: Double order creates instead of regular after creating  -> COAGRISAN OPFH 1011/551 DI
 
 
Expected result: Regular order should be created

 
CASE 3Environment: prod 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened for 
- Customer A
- Customer B 
 Steps: 
• Open Koppert One in Tab A as Customer A. 
• Place an order on Day 1 (orders are correctly shown). 
• Leave Tab A inactive (browser puts the tab to sleep). 
• Open Koppert One in Tab B as Customer B on Day 2 and place a new order. 
• Re-focus Tab A and attempt to place or view orders.
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1766386093114689
 
  
Actual result: Two orders were placed for the same location and same shipping date: 
-NL6-SO00281074 Placed via Planner on Web on 15th of December 
-NL6-SO00280650 Placed via Planner on Web on 10th of December

 
 
 
Expected result: Suggested  direction ->
-Trigger a re-fetch of orders when the tab regains focus (e.g. visibilitychange or focus event).
 
-Alternatively, reinitialize the SSE connection when the tab wakes up.

---

## Bug #1374: Visit reports are not visible if select period for one year

- **URL:** [1374](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/1374)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Bug; Consultant; Monitoring
- **Created:** 2022-08-31T20:23:35.023Z
- **Changed:** 2026-03-11T10:40:23.27Z

### Repro Steps

Precondition: log in as consultant  

 
• Go to customer dashboard  
• Click menu Analysis  
• Select location and department with observation  
• Select period for last year  
• Click at week number under the graph  
• Enter correct visit report  
• Click Add notes  
 Expected result: modal closed, flag with visit report appear under week number  

 
Actual result: modal closed, visit report is not visible  

 
Postcondition: visit report is created, if select half year or less visit reports are visible again. User also cant see visit reports if select last year

---

## Bug #1305: [Compare][absense/presense] Data on Compare page doesn't match to the analysis page

- **URL:** [1305](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/1305)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Compare; Monitor; regression 02/22/23
- **Created:** 2022-08-18T09:11:32.027Z
- **Changed:** 2026-03-11T10:40:15.263Z

### Repro Steps

Steps to reproduce 
 
• Login to dashboard 
• Open Analysis page 
• In filters select : 
• location - Marsi 
• department - dep1 
• period: '2021 week 44' - 'week 52 2021' 
• pests -> check only 'Caterpillars Tomato pinworm' 
 • 
 
• Open one more tab and navigate to Compare page 
• select the following data in the 'Choose location and department pop-up': 
• 
 
• Click Next and navigate to step 2. 
• on step 2 select following pest and click Save: 
• 
 
• Compare Data for weeks 45,47,48 
 Actual results:  
There are different values for weeks: 
week 45 Analysis:   100 
     Compare: 95.65 
week 47 Analysis:   100 
     Compare: 68.97 
week 48 Analysis:   100
 
     Compare: 78.95 

 
Expected results:Data should be the same    
 

 

 
Postcondition: Graph on Compare page id empty if select item with method Absence/Presence  
24/02/2023  11:49 Bug filed on &quot;Compare data from uploaded scout session  on Compare and Analysis&quot; 
Step no. Result Title 
1. Passed Precondition: 
- User logged in to Monitoring 
- User has location and department
- Upload scout section from Mobile app for specific item(s) 
- In one tab Compare page is opened with setup location-department and specific item(s) 
- In second tab opened Analysis page with setup same location-department and specific item(s) 
2. Failed Compare data on &quot;Compare&quot; and &quot;Analysis&quot; pageExpected Result 
Data is the same on &quot;Compare and &quot;Analysis&quot; pages 
 
Test Configuration: Chrome 

 
15/03/2023  11:52 Bug filed on &quot;Compare data from uploaded scout session  on Compare and Analysis&quot; 
Step no. Result Title 
1. Passed Precondition: 
- User logged in to Monitoring 
- User has location and department
- Upload scout section from Mobile app for specific item(s) 
- In one tab Compare page is opened with setup location-department and specific item(s) 
- In second tab opened Analysis page with setup same location-department and specific item(s) 
2. Failed Compare data on &quot;Compare&quot; and &quot;Analysis&quot; pageExpected Result 
Data is the same on &quot;Compare and &quot;Analysis&quot; pages 
 
Test Configuration: Chrome 

 
07/04/2023  13:42 Bug filed on &quot;Compare data from uploaded scout session  on Compare and Analysis&quot; 
Step no. Result Title 
1. None Precondition: 
- User logged in to Monitoring 
- User has location and department
- Upload scout section from Mobile app for specific item(s) 
- In one tab Compare page is opened with setup location-department and specific item(s) 
- In second tab opened Analysis page with setup same location-department and specific item(s) 
2. Failed Compare data on &quot;Compare&quot; and &quot;Analysis&quot; pageExpected Result 
Data is the same on &quot;Compare and &quot;Analysis&quot; pages 
 
Test Configuration: Chrome

---

## Bug #5080: Alert is Not deleted from Home pag

- **URL:** [5080](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/5080)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Scout_Sessions
- **Created:** 2023-05-09T09:20:20.653Z
- **Changed:** 2026-03-11T10:39:11.94Z

### Repro Steps

Steps to reproduce: 

 
• Be sure thata you have uploaded from mob App 
• Go to Scout Sessions page 
• Open Observation from precondition 
• Edit horiver scan which where made by observation in mobile app  
• Add a high amount to trigger the alert 
• Alert is triggered 
• Back to Scout sessions page  
• Delete edited observation 
• Check Home page 
 Expected result: 
Alert should be deleted from the Home page. 

 
Actual result: 
Alert is NOT deleted from Home screen -> &quot;Something went wrong... &quot; is displayed. Please follow the screenshot.

---

## Bug #4550: Several events do not display in GA

- **URL:** [4550](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/4550)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Natutec Scout
- **AssignedTo:** Daniil Borynskyi
- **Created:** 2023-03-22T15:44:35.693Z
- **Changed:** 2026-03-11T10:38:56.333Z

### Repro Steps

Please follow the excel file -> &quot;Test Result&quot; row  
https://azurekoppert.sharepoint.com/:x:/s/DigitalInnovation/ESRbQ2itwCRCrTNBKx7LqG0Bznx5Vit5sdcXRnw8MRBJyg?e=6BML2k

---

## Bug #1837: I can scan Horivers without Whitefly in my scouttemplate

- **URL:** [1837](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/1837)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Mobile
- **Created:** 2022-11-03T09:07:41.077Z
- **Changed:** 2026-03-11T10:38:40.727Z

### Repro Steps

Steps to reproduce; 
• Have a department set up, without whitefly T. Vaporarorium (DONT delete during setup, first set it up, then delete, otherwise it triggers a known bug) 
• Log in to app and create scout session 
• Open scout session + row + post 
 Expected result: 
• Scan horiver is unavailable because whitefly is not in scout template 
 Actual result: 
• I can use horiver scanner, but don't see my results because HVA backend checks for the right Whitefly scoutrecord (which is 1)

---

## Bug #1535: User can't edit Action in app for Scan Horiver observation after saving horiver scan

- **URL:** [1535](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/1535)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Bug; Mobile_App
- **AssignedTo:** Oleksandr Chesovnyk
- **Created:** 2022-10-03T10:40:34.153Z
- **Changed:** 2026-03-11T10:38:30.663Z

### Repro Steps

Precondition: create location and greenhouse department, log in to Natutec Scout app v.2.9.17 

 
 Steps to reproduce 
 
• Add active scout session for greenhouse department  
• Click at active scout session  
• Click at row&post  
• Click Scan Horiver  
• Take scan of front and back  
• Click Save  
• Click back to Scan Horiver  
• Click toggle Scan single-side and Card replace - on  
• Click Save? 
 Expected result: when user change something should appear button Save to save changes  

 
Actual result: button Save is not appear after changes so user can't edit Action in app for Scan Horiver observation after saving horiver scan 
See attachments

---

## Bug #1210: [Outdoor] If enter department name for greenhouse and switch to outdoor, next step button doesn't work

- **URL:** [1210](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/1210)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Departments; Locations; Monitor
- **Created:** 2022-08-10T13:21:38.007Z
- **Changed:** 2026-03-11T10:37:21.17Z

### Repro Steps

Steps to reproduce   
• Click +New department 
 
• Enter department name for greenhouse 
 
• Switch to outdoor department 
 
• Click Next   
 
 Expected result: User can enter department name for greenhouse and switch to outdoor and use created name 
Actual result: user cant navigate to next step on outdoor department if enter department name for greenhouse and switch 
Postcondition: if enter department name for greenhouse and switch to outdoor, clean department name and type again then next button is working  
See attachment

---

## Bug #20195: The changes made by Admin are applied on Planner/simple order only after refreshing a page by user

- **URL:** [20195](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20195)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Order; PBI; Planner; Web
- **AssignedTo:** Mykola Pavlyk
- **Created:** 2026-03-09T14:44:58.383Z
- **Changed:** 2026-03-10T10:11:28.78Z

### Repro Steps

Pre conditions
 
User is on Planner in tab 1
Admin is on Admin page in tab 2

STR:
• Make the order reference field required on Admin page 
• Make an order with empty order reference field on Planner as user 
• Observe behaviour 
 Actual result: Order is created without an order reference. The changes made by Admin are applied for user on Planner only after refreshing the page.

Expected result: the order is not created, and the error appears 

Note: the same with simple ordering flow

---

## Bug #20062: Some files formats are not opened on iOS

- **URL:** [20062](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20062)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** IOS; Mobile; PBI; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-04T10:16:24.95Z
- **Changed:** 2026-03-10T10:09:04.237Z

### Repro Steps

Environment:  dev, iOS
 
 
iPhone 17 PRO maxiOS 18.6.2
 
 

 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has Visit Report 1 that was reported in C.J.Klep location  
• Visit Report 1 has different files formats in attachments in General notes/Observations:
- tsv
- xlsxSteps: 
  
• Click on Visit Report 1 to see visit report details 
• Click on Attachments:
- tsv- xlsx 
• Pay attention  
  
Actual result: Some files formats are not opened on iOS 
 
 
Expected result: should be opened

---

## Bug #20181: [Mobile] Attached files in scoutables in visit reports have incorrect names

- **URL:** [20181](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20181)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit reports
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-03-06T14:57:23.27Z
- **Changed:** 2026-03-10T09:33:03.1Z

### Repro Steps

Env: iOS, Android 
 
Preconditions: 
• User has access to view and create/edit visit reports on web and mobile 
• User has any enterprise added 
 Steps: 
• Open Knowledge > Visit reports on web 
• Create new report and select any location or edit any existing report 
• Scroll to Cultivar tabs 
• Add any cultivar if none exists and add a scoutable 
• Attach file(s) in formats .doc, .xlsx, .csv, .pdf, .mp4 to the scoutable 

 
• Save the report 
• Open the same report on mobile device and verify the name of the attached files 
 Actual result: ID is shown instead of the actual file name

Expected result: File name should be shown (as in step 5 and as in general notes)

 
 
 

 
Note: there was a similar bug on web which is now fixed

https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20067

---

## Bug #14604: Double orders are created when F&O is up again

- **URL:** [14604](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14604)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Cool; Lag Buster; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-05-20T08:33:09.55Z
- **Changed:** 2026-03-10T08:55:04.067Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened on both tabs 
 Steps: 
• Place an order on planner 
• Disable F&O 
• Edit same order (change quantity) 
• Delete order 
• Add new order to the same point 
• Enable F&O 
• Observe 
  
Actual result: Double orders are created (Reproduced from time to time) 
 
Expected result: Order should leave in the same state as before enabling F&O

---

## Bug #14368: First data is displayed for Order Reference instead of the last (newest)

- **URL:** [14368](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14368)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Cool; Lag Buster; Planner
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-05-05T08:54:35.323Z
- **Changed:** 2026-03-09T13:22:16.223Z

### Repro Steps

Environment:  dev. 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened  
• Some order has been created 
 Steps: 
• Click on order box 
• Enter 1 in Order Reference field -> Save 
• Continue updating  Order Reference field very fast
31  -> Save
312 -> Save
3124 -> Save 
31245 -> Save
312457 -> Save 
• Pay attention to the Order Reference and the last data that displayed in requests 
  
Actual result: 
• The last Upsert contains 312457 
• Requests after Upsert are contain 312457
 
• The last data (312457) is not displayed in Order Reference 
• Requests after Upsert clear the last data (312457) and the first value (Step 2) is displayed for order reference due to last request receiving -> The first request is displayed as the last one
 
  
 

 

 

 

 

 
Expected result: The last data should be displayed -> 312457

---

## Bug #19939: Cultivar names are not wrapped

- **URL:** [19939](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19939)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; IOS; Mobile; PBI; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-27T09:53:04.113Z
- **Changed:** 2026-03-09T09:56:57.823Z

### Repro Steps

Environment:  dev, iOS, Android 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has Visit Report 1 with a few cultivars with long names -> 50 characters 
• 

Steps: 
  
• Click on Visit Report 1 
• Pay attention to the Cultivars  
  
Actual result: Cultivar names are not wrapped 

 
 
Expected result: Cultivar names should be wrapped

---

## Bug #19347: [Orders] Locations search doesn't work in Orders

- **URL:** [19347](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19347)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Automation
- **Created:** 2026-02-05T09:15:09.267Z
- **Changed:** 2026-03-09T09:18:19.887Z

### Repro Steps

• Find enterprise with 10 or more locations
 
• Apply this enterprise 
• Go to Orders -> Create Order 
• Observe locations dropdown

 
 Expected result: 
Search icon with search enabled

Actual result:
Search icon absent, search itself doesn't work

---

## Bug #19904: Can't create visit report - API return 404 on POST

- **URL:** [19904](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19904)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE
- **AssignedTo:** Paweł Niedzin
- **Created:** 2026-02-25T14:00:31.253Z
- **Changed:** 2026-03-09T09:10:19.743Z

### Repro Steps

I can't create a visit report. It’s working on neither the web nor mobile.
 

 
• go to visit report and try co create new one:  
 
 
The response is:  

 
WEB:  
•  
{
    &quot;id&quot;: &quot;bd4e7e3e-278a-4f2e-8f11-1784cde8d9e7&quot;,
 
    &quot;message&quot;: &quot;Author not found by user id&quot;,
 
    &quot;statusCode&quot;: 404,
 
    &quot;metadata&quot;: [
 
        {
 
            &quot;defaultMessage&quot;: &quot;Author with user id 76ab6d0d-9989-4a5e-adc9-e1cb541d2191 not found&quot;,
 
            &quot;translationCode&quot;: &quot;backend.exceptions.author.notFoundByUserId&quot;,
 
            &quot;code&quot;: &quot;AUTHOR_NOT_FOUND_BY_USER_ID&quot;,
 
            &quot;userId&quot;: &quot;76ab6d0d-9989-4a5e-adc9-e1cb541d2191&quot;
 
        }
 
    ]
 
}•  
  
 
Mobile: Error response from /v1/mobile/visit-reports CLIENT_ERROR
 LOG  API processErrorResponse message:  backend.exceptions.common.unhandledHttpError
 
 LOG  API processErrorResponse defaultNotTranslatedMessage:  Cannot POST /api/v1/mobile/visit-reports

---

## Bug #20016: Order is not displayed on Planner due to Leadtime

- **URL:** [20016](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20016)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; FE; Planner; PRD; Production; QualityAssurance
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-03T08:52:27.993Z
- **Changed:** 2026-03-09T07:23:27.063Z

### Repro Steps

Environment: prod 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened  
• Bosch Berries US1-118303 is selected 
 Steps: 
• Go to planner 
• Expect to see an order in week 8 (17-Feb-2026) (US1-SO00345202)
Slack -> https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1772095189683559 
   
Actual result: The ordered products do not even show in planner unless you add them manually, indicating planner thinks these have not been ordered in the past
 

 
Expected result: should be shown

---

## Bug #16696: Changes related to Language and Country are not applied after killing the app and opening  again

- **URL:** [16696](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16696)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-24T14:29:10.7Z
- **Changed:** 2026-03-06T14:10:11.48Z

### Repro Steps

Environment: stage,  v3.0.0_OTA_2 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• More -> Settings is opened on mobile 
 Steps: 
• Open WEB -> Admin -> Users -> find appropriate user and change Language or Country  
• Open app on mobile  
• Kill and open app again  
• Pay attention to the Language or Country
NOTE: the same if you log in with the same user on both devices and change the language or country 
  
Actual result: Changes related to Language and Country are not applied after killing the app and opening  again 
 
Expected result: Changes related to Language and Country should be applied after killing the app and opening  again

---

## Bug #18909: Order with 'Invoiced' status displays on Orders list with 'Open' status and without products

- **URL:** [18909](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18909)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** BE; Orders; Web
- **AssignedTo:** Tiffany Levens
- **Created:** 2026-01-15T15:14:37.203Z
- **Changed:** 2026-03-06T13:51:59.413Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Orders list is displayed 
 Steps: 
• Pay attention to the order -> NL6-SO00252421 
• Click View for NL6-SO00252421 
• Pay attention to the product and status  
  
Actual result:  
• Order with 'Invoiced' status displays on Orders list 
-> https://koppertplatform.slack.com/archives/C0464PF164W/p1765793945758489
 
• 'Open' status is displayed for order without products 
  

 

 

 

 
Expected result: TBD

---

## Bug #17304: Token doesn't refresh and user log out from Koppert.One

- **URL:** [17304](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17304)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Production; QualityAssurance; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-23T11:47:51.54Z
- **Changed:** 2026-03-06T12:06:14.63Z

### Repro Steps

Environment: prod 
 
 
Preconditions:• Kopppert.one is opened 
 Steps: 
• Wait some time 
• Make any changes on opening page 
• Pay attention to the Koppert.One
Note: I noticed this issue on Admin page. Please, look at discussion to fint more details 
-> https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1761135927888179 
  
Actual result: Token doesn't refresh and user log out from Koppert.One 
 
Expected result: Token should be refreshed and user should NOt log out from Koppert.One

---

## Bug #20012: Pagination is slow when selecting Enterprise from the user details page

- **URL:** [20012](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/20012)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Enterprise; PRD; Production; User
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-03-02T13:47:13.4Z
- **Changed:** 2026-03-05T13:42:41.57Z

### Repro Steps

Environment:  prod (stage works better)
 

 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened -> User details  
 Steps: 
• Click on Add Enterprises to this user  
• Select a few Enterprises on the first page 
• Click to the next pages 
 
• Pay attention to next pages  
  
Actual result: Pagination is slow when selecting Enterprise from the user details page (please, look at the video) 
 
Expected result: should be faster

---

## Bug #19145: Delete quantity popup is displayed instead of order confirmation

- **URL:** [19145](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19145)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Orders; PBI
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-27T11:03:56.223Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev  
 
 
 
 
Build: 3.2.3 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Orders list -> edit is opened  
 Steps: 
• Delete one order line in edit mode 
• Press save 
• Observe 
  
Actual result: Delete quantity popup is displayed instead of order confirmation 
Expected result: Order confirmation should be shown when pressing save button. 
As when deleting the order line you already have to confirm the deletion by clicking on the 'delete order line' modal and then no need to confirm deletion one more time on save click

---

## Bug #19096: Text is overlapped on mobile planner for NL translation

- **URL:** [19096](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19096)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; QualityAssurance
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-26T08:40:18.15Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev (IOS 3.2.3). (pixel 6a) android 16
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1769415031446189
 
 
Steps: 
• Open app 
• Select NL language 
• Open planner 
• Type some value 
• Observe Discard changes button 
• Open email configuration in profile 
• Observe 
 
 
 
Actual result: 
Text inside button is overlapped   
 
Expected result: 
Text should be correctly displayed

---

## Bug #19094: Everything is clipping

- **URL:** [19094](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19094)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** Mobile
- **AssignedTo:** Tiffany Levens
- **Created:** 2026-01-26T07:58:51.483Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

_(empty)_

---

## Bug #19043: Loader is clipped if Orders inf is expanded on Android

- **URL:** [19043](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19043)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-23T08:50:17.28Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev 
v3.2.3_OTA_2
Samsung Galaxy A35 5GSM-A356B/DSVersion 14
 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Orders list is displayed 
 Steps: 
• Click on Open all button 
• Refresh the screen 
• Pay attention to the Loader 
  
Actual result: Loader is clipped if Orders inf is expanded on Android
 
Expected result: Loader should be fully visible

---

## Bug #19033: Incorrect Input fields are highlighted in case when lead time + deadline timer is set

- **URL:** [19033](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19033)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-22T10:57:14.133Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Planner is displayed 
• Product 1 has lead time

 
 Steps: 
• Open Planner on mobile 
• Pay attention to the the same product  
  
Actual result: Incorrect Input fields are highlighted in case when lead time + deadline timer is set 

 
 
Expected result: Input fields should not be highlighted in case when lead time + deadline timer is set due to one day buffer (this scenario are impossible)

---

## Bug #18951: UI issues related to extended order info

- **URL:** [18951](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18951)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-20T14:38:43.087Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Orders list is displayed 
 CASE 1
Steps: 
• Pay attention to the order number  
  
Actual result: Number is underlined
 
Expected result: Number should not be underlined

 

 

 

 

 
CASE 2Steps: 
• Refresh the page  
• Select Entrp without orders 
• Pay attention to the message  
  
Actual result: There are no spaces to the right or left 
Expected result: should be

---

## Bug #18950: 'Collapse all' button changes to 'Open all' after refreshing

- **URL:** [18950](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18950)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-20T14:38:30.557Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Orders list is displayed 
 Steps: 
• Click on Collapse all button 
• Refresh the screen 
• Pay attention to the Collapse all button 
  
Actual result: 'Collapse all' button changes to 'Open all' after refreshing 
 
Expected result: 'Collapse all' button should not be changes to 'Open all' after refreshing

---

## Bug #18923: Delete account function doesn't work on mobile

- **URL:** [18923](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18923)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-19T11:47:58.54Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• More is displayed -> User settings

Steps: 
  
• Click on Delete account 
• Confirm 
  
Actual result: Delete account function doesn't work on mobile 
 
Expected result:  User should be deleted and log in screen should be displayed

---

## Bug #18913: Spaces between Week and orders is a bit too large on Orders list

- **URL:** [18913](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18913)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-16T11:21:45.87Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Orders list is displayed 
 Steps: 
• Collapse all orders 
• Pay attention to the Spaces between Week and orders  
  
Actual result: Spaces between Week and orders is a bit too large
 
 
Expected result: Should be smaller as on design

---

## Bug #18564: Home screen doesn't open after changing roles from Basic to Beta and to Basic

- **URL:** [18564](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18564)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Roles; Roles & Permissions
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-23T12:47:58.41Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  pre-prod 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• User has  Basic role 
 Steps: 
• Click on burger menu  
• Go to WEB -> Users  
• Click on User with Basic role 
• Change to Beta-> Save 
• Go to mobile -> Settings 
• Change the language 
• Go to WEB -> Users  
• Click on User with Beta role 
• Change to Basic -> Save
 
• Go to mobile -> Settings 
• Change the language 
• Click on Back button to see Home screen  
• Pay attention to the Home screen 
  
Actual result: Home screen doesn't open after changing roles from Basic to Beta and to Basic, only after relogin  
Expected result:  Home screen should be opened after changing roles from Basic to Beta and to Basic

---

## Bug #18484: Months arrows are not displayed on data picker for simple ordering after selecting Entrp that has not been selected yet on Android

- **URL:** [18484](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18484)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-22T10:47:33.383Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• More is displayed 
• 4Evergreen KG1 B.V. entrp is added to user but has not been selected yet 

 
 Steps: 
• Click on Entrp drop-down  
• Select 4Evergreen KG1 B.V 
• Click on Orders and Planner 
• Change the entrp that user has already used for ordering -> 4Evergreen Steenbergen B.V.
 
• Click on Create order button  
• Click on data picker 
• Pay attention to the Months arrows  
  
Actual result: Months arrows are not displayed 
Expected result:  Should be displayed

---

## Bug #18451: The available shipping method in Koppert One is not set when creating an order on Order list

- **URL:** [18451](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18451)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-17T15:50:12.487Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Pre conditions:
Only one shipping method is whitelisted in Koppert One

STR:
• Open order list 
• Click on the 'Create order' button 
• Create an order 
• Check the shipping method that is set for this order

Actual result: the shipping method from FO is set to the order

Expected result: The shipping method that is available in Koppert One is set to the order

---

## Bug #18449: Products without qty is displayed on Order details in case when Add product modal continues displaying after Deadline modal is closed

- **URL:** [18449](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18449)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-17T14:22:39.053Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  stage 
Build: v.3.2.0 
 
 
Preconditions:• User open in to Koppert One 
• User has access to Order list  
 Steps: 
• Click on order for the nearest day -> Edit 
• Set deadline timer 
• Click on Add product  
• Wait by the deadline end -> Close the modal  
• Select a couple of products _> Clic on Add button  
• Pay attention to the added products 
  
Actual result: Products without qty is displayed on Order details  
 
Expected result: Products without qty should NOT displayed on Order details

---

## Bug #18445: Wrong screen is displayed when user has no enterprises

- **URL:** [18445](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18445)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Planner; Regression
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-12-17T12:46:42.14Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR: 
• Open planner by user without enterprises 
 Actual result: User see wrong message 

 
Expected result: User see correct message

---

## Bug #18444: Ordering for shipping day... modal appears instead of Confirmation when editing order with product + lead time

- **URL:** [18444](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18444)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-17T12:36:19.143Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  stage 
Build: v.3.2.0 
 
 
Preconditions:• User open in to Koppert One 
• User has access to Order list -> Order details for some product 
- Product 1
- Product 2 
 Steps: 
• Click on Edit 
• Add a few products + one product with lead time 
• Enter 0 for product 2 
• Click on trash icon for Product 3 -> Confirm
 
• Click Save  
• Pay attention to the modal -> Ordering for shipping day .... 
• Close teh modal  
• Pay attention to the Edit  
  
Actual result:  
• Order can not be edited for product with lead time 
• Wrong modal appears -> Ordering for shipping day .... 
• Edit button is not disabled for 20 sec after adding product with lead time + removing some products 
  
Expected result:  
• Order should be edited for product with lead time 
• Removing qty modal should appear 
• Edit button should be disabled for 20 sec during order processing

---

## Bug #18442: Permissions/roles are not applied when closed and opened app again for Namaodes radar

- **URL:** [18442](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18442)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-17T12:00:24.81Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  stage 
Build: v.3.2.0 
 
 
 
Preconditions:• Kopppert.one is opened 
• User has Basic role 
• More is opened  
 Steps: 
• Open WEB -> add roles/permissions to see Namaodes radar -> Save

 
• Open app on mobile  
• Kill and open app again  
• Pay attention to the Namaodes radar  
  
Actual result: Permissions/roles are not applied when closed and opened app again for Namaodes radar  
 
Expected result: Permissions/roles should be applied when closed and opened app again for Namaodes radar (works after changing language) -> 15401 bug was

---

## Bug #18440: The loader is always loading on Order list if select an enterprise with no locations set up

- **URL:** [18440](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18440)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-17T11:21:32.133Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:
• Select '48 Farms Project Packs' enterprise on More screen 
• Go to Order list 
• Refresh the list 
 Actual result: loader is loading all the time, and then it stucks if you switch to another screen and return back 
Expected result: loader stops loading if no data is received

NOTE: The 'Order mode' button is disabled on Planner, but nothing happens after tapping on it. Is it expected?

---

## Bug #18425: Language does not change according to the last selection

- **URL:** [18425](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18425)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; My_Profile
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-16T11:17:47.243Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Dutch is selected 
• My profile is opened -> Settings 
 Steps: 
• Click on language  
• Select another one 
• Select again  
• Pay attention to the language from Step 3 
  
Actual result: Language does not change according to the last selection 
Expected result:  The last selected language should be displayed

---

## Bug #18387: Wrong dutch translation -> No translated to None

- **URL:** [18387](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18387)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; My_Profile; PBI
- **AssignedTo:** Tiffany Levens
- **Created:** 2025-12-16T08:26:59.62Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Dutch is selected
 
• My profile is opened  
 Steps: 
• Click on Delete account  
• Pay attention to the No 
  
Actual result:  Wrong dutch translation -> No translated to None 
Expected result:  TBD

---

## Bug #18346: 'Cancel' button doesn't respond on the 'Create order' screen after tapping the Cancel button in the 'Add product' modal

- **URL:** [18346](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18346)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-12T13:48:21.63Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:
 

• Open Create order screen 
• Tap on the Add product  
• Search for something in the Add product modal 
• Tap on the 'Cancel' button 
• Tap on the 'Cancel' button on the 'Create order' screen 
 Actual result: 'Cancel' button doesn't respond on the 'Create order' screen 
Expected result: 'Create order' screen is closed after tapping on the 'Cancel' button

NOTE: It reproduces for me only on Android device

---

## Bug #18345: Empty screen with loader appears for a sec after tapping on the 'Create order' button

- **URL:** [18345](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18345)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-12T13:07:23.97Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:
• Open Orders 
• 2. Tap on the Create order button 
• Checl the screen 
 Actual result: Empty screen with loader appears for a sec 

Expected result: Empty screen with loader is not visible

---

## Bug #18329: Native footer overlaps 'Go to Koppert One' button for Basic user on Android

- **URL:** [18329](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18329)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-11T13:19:02.227Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  Android, dev 
Build: v.3.1.2_ OTA_11 
Samsung Galaxy A35 5G, SM-A356B/DS, 14 version 
 
Preconditions:
• User open in to Koppert One 
 Steps: 
• Click on Create account 
• Fill in all required fields -> Save 
• Confirm Email 
• Login in the app as Basic user 
• Pay attention to the Complete your profile screen 
  
Actual result: Native footer overlaps 'Go to Koppert One' button for Basic user on Android 
 
Expected result: Native footer should NOT overlap 'Go to Koppert One' button for Basic user on Android

---

## Bug #18298: The error that products are not allowed to be ordered is not translated

- **URL:** [18298](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18298)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-10T13:23:58.61Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Pre conditions
'Nederlands' language is selected in the User's profile

STR:
• Open 'Order create' screen 
• Add some products -> add quantity 
• Go to Admin -> Customer Assortments 
• Make the added products unavailable 
• Return to the 'Create order' screen 
• Tap on the 'Save button
 
• Check the error modal 
 Actual result: BE error appears, it's not handled and translated on the FE side

 

Expected result: the error is translated

---

## Bug #18281: The added products is not possible to order in case changing date from unavailable to available after deadline is passed

- **URL:** [18281](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18281)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-09T10:20:10.38Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:
• Open the 'Create order' screen 
• Add some products -> add quantity
 
• Do not create an order 
• Wait until the deadline for order creation is passed
 
• Tap on the 'Save' button
 
• Check that order is not created, the appropriate modal appears 
• Change the date to the next available day
 
• Add new products 
• Check the quantity cell 
 Actual result: The quantity cell is disabled, it's not possible to order the products
Expected result: The quantity cell is enabled, and user can order the added products

Note: if you kill the app and try to add the products again -> it will work, and ordering is possible

---

## Bug #18215: The quantity is not cleared for a lead time product when selecting an unavailable date while creating an order

- **URL:** [18215](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18215)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-08T15:48:28.057Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:
 

 
1. Open Orders -> Create order 
2. Add product with lead time
3. Select available for ordering date 
4. Tap quantity for the product 
5. Change the date and select the unavailable date for this product
6. Check the quantity  
7. Create order 

 
Actual result: the quantity is not cleared, the order is created

Expected result: the quantity is cleared, it's not possible to make an order for an unavailable date

---

## Bug #18214: The 'Removing a quantity' modal doesn't appear if delete product's quantity while creating an order

- **URL:** [18214](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18214)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-08T14:55:19.5Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:
 

1. Open Orders -> Create order 
2. Add some product -> add quantity 
3. Add one more product -> add quantity 
4. Delete quantity for one of products 
5. Save 
6. Check the modal 

 
Actual result: 'Order confirmation' modal appears
Expected result: The 'Removing a quantity' modal appears

---

## Bug #18187: The 'Create order' button is smaller and not consistent with other similar buttons in terms of design

- **URL:** [18187](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18187)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Order List; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-08T09:50:41.18Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:  

 
• Open Planner 
• Open Order list 
• Open Order edit screen 
• Compare the buttons 
 Actual result: The 'Create order' button is smaller, the font size is different, and it is not consistent with other similar buttons

Expected result: all button sizes and fonts are consistent

---

## Bug #18185: 'Terms and conditions' modal doesn't appear during order Editing on Order details

- **URL:** [18185](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18185)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-08T09:16:27.043Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev, v3.1.2_OTA_4 
 
Preconditions:• Koppert.One is opened on mobile 
• Orders list is opened 
• User hasn't accept 'Terms and conditions' yet 
 Steps: 
• Click on Order number -> e.g. NL6-SO00252327 
• Pay attention to the 'Terms and conditions' modal  
  
Actual result:  
• Edit button is disabled  
• 'Terms and conditions' modal doesn't appear after clicking on disabled Edit

 
  
 
Expected result:  
• Edit button should be enabled 
• 'Terms and conditions' modal should appear after clicking on Edit (please, look on WEB)

---

## Bug #17732: [Mobile] Discard & Save btns are not responding sometimes

- **URL:** [17732](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17732)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; PBI
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-11-20T08:12:24.827Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev (IOS 3.1.1 OTA_1). 
 
Steps: 
• Open orders page as admin or orderer 
• Find editable order (order user in video is NL6-SO00252081 C.J Klep B.V) and open it 
• Press edit button 
• Change quantity for product and press Discard changes - in are you sure modal press no 
• Press Discard changes again 
  
Actual result: 
Are you sure modal is not opened for Discard and Save buttons 
 
Expected result: 
Discard and Save buttons reacting on click

---

## Bug #17693: Back native button doesn't work for modals in Android

- **URL:** [17693](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17693)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-17T10:38:23.307Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Orders list is opened -> Mode On  
 Steps: 
• Click on Add product link  
• Click on back button  
• Pay attention to the Add product modal 
  
Actual result: Back native button doesn't work for modals in Android
 
Expected result: Back native button should work for modals in Android

---

## Bug #17546: Conflict Location modal doesn't appear on Planner if select/change Shipping methods on Order details

- **URL:** [17546](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17546)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-07T14:26:35.81Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: stage  
 
 
Build: v3.1.0  
 
Preconditions:• User is log in Koppert one 
• Orders list is displayed on phone 1 -> Location 1 
• Planner is displayed on phone 2 -> Location 2 
• User has order 1 
 Steps: 
• Change something (add ty) on Location 1 where placed order 1 
• Click on order number Order 1 -> Edit  
• Select or change Shipping methods  -> Save 
• Pay attention to the Conflict Location modal on Planner 
  
Actual result: Conflict Location modal doesn't appear on Planner if select/change Shipping methods on Order details
 
Expected result: Conflict Location modal should appear on Planner if select/change Shipping methods on Order details

---

## Bug #17531: Order box continues displaying and removed qty appears again for a few seconds after qty is removed

- **URL:** [17531](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17531)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-06T16:04:02.517Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Build: v3.1.0  
 
Preconditions:• User is log in Koppert one 
• Planner is displayed 
 Steps: 
• Remove qty for product -> Save   
• Pay attention to the order box
Note: sometimes previous deleted qty also appears 
  
Actual result: OOrder box continues displaying and removed qty appears again for a few seconds after qty is removed 
Expected result: Order box should disappear and removed qty should not appear

---

## Bug #17529: Years  are not displayed on Android but displayed on iOS in Orders List

- **URL:** [17529](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17529)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-06T15:05:34.87Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: Android 
 
Samsung Galaxy A35 5GSM-A356B/DS 
 
 
Build: v3.1.0  
 
Preconditions:• User is log in Koppert one 
• Orders list is displayed 
 Steps: 
• Pay attention to the year next to months  
  
Actual result: Years are not displayed on Android but displayed on iOS in Orders List 
Expected result: Years should be displayed on Android but displayed on iOS in Orders List

---

## Bug #17528: ʼProduct name' and 'pieces' titles continue displaying when all products were cancelled

- **URL:** [17528](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17528)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-06T14:53:33.05Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: stage  
 
 
Build: v3.1.0  
 
Preconditions:• User is log in Koppert one 
• Orders list is displayed 
 Steps: 
• Click on order number -> Edit  
• Remove qty for all products -> SaveClick on  
• Pay attention to the ʼProduct name' and 'pieces' titles  
  
Actual result: ʼProduct name' and 'pieces' titles continue displaying when all products were cancelled
 
Expected result: ʼProduct name' and 'pieces' titles should NOT continue displaying when all products were cancelled

---

## Bug #17527: Added products without qty continue displaying after click on Back arrow and open details again

- **URL:** [17527](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17527)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-06T14:24:58.247Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: stage  
 
 
Build: v3.1.0  
 
Preconditions:
• User is log in Koppert one 
• Orders list is displayed 
•  
 Steps: 
• Click on order number -> Edit  
• Click on +Add product  
• Add a couple of products 
• Click on Back arrow 
• Pay attention to the added product without qty 
  
Actual result: Added products without qty continue displaying after click on Back arrow and open details again 
Expected result: Added products without qty should be cleared

---

## Bug #17526: Order from Location 1 is displayed on Location 5 in Orders list

- **URL:** [17526](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17526)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-06T13:46:44.743Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: stage  
 
 
Build: v3.1.0  
 
Preconditions:• User is log in Koppert one 
• Orders list is displayed 
• 4Evergreen Steenbergen B.V. enterprise is selected  
 Steps: 
• Select 4Evergreen Steenbergen B.V. (IV) (BIO), / Afd. IV (BIO) location  
• Pay attention to the order  
• Click on View details 
• Pay attention to the order 
 
  
Actual result: Order from 4Evergreen Steenbergen B.V. is displayed on 4Evergreen Steenbergen B.V. (IV) (BIO), / Afd. IV (BIO) 

 
Expected result: Orders should be displayed according to Locations

---

## Bug #17424: The order is editable however the deadline for editing has passed

- **URL:** [17424](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17424)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Orders; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-03T14:42:34.833Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:
• Open A. de Bruijn & Zn BV enterprise 
• Open Orders 
• Check the delivery dates and deadlines for latest orders 
• Check NL6-SO00251662, NL6-SO00251662 orders

Actual result: the order is editable

Expected result: the order cannot be edited since the deadline has passed

---

## Bug #17400: [IOS] Leave guard doesn't appear after making changes in the order and swiping to the right

- **URL:** [17400](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17400)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Orders; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-10-31T14:05:42.77Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:

• Open Orders 
• Tap on some order in the list -> Edit 
• Make some changes in the order 
• Swipe to the right

Actual result: Leave guard doesn't appear 
Expected result: Leave guard appears or the swiping functionality is disabled on this screen

---

## Bug #17389: The shipping method field is not displayed on the Order details screen

- **URL:** [17389](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17389)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Orders; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-10-30T13:41:22.63Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Preconditions:

 
- User logged in to Koppert One
 
- Has role with access to create/update &quot;Orders&quot;
 
- Has linked enterprise with locations
 
- Has some orders for future
 
- Orders list is opened -> Mode ON

STR: 
• Create order on Planner for some NL6 enterprise 
• Do not select any shipping method 
• Save it 
• Open the order on the Order list 
• Check the shipping method field 
 Actual result: The shipping method field is not displayed

Expected result: the shipping method is displayed

---

## Bug #17388: [KO] is not added when adding a note to the order

- **URL:** [17388](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17388)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Orders; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-10-30T13:12:57.457Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Preconditions:

 
- User logged in to Koppert One 
- Has role with access to create/update &quot;Orders&quot; 
 
- Has linked enterprise with locations 
 
- Has some orders for future 
- Orders list is opened -> Mode ON

STR:
• Open some order -> Edit 
• Add/update some order note 
• Check the response after

Actual result: [KO] is not added before a note

Expected result: [KO]  + order note is displayed

---

## Bug #17379: Conflict location doesn't appear on Planner when deleting the order reference on the Order details screen

- **URL:** [17379](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17379)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Orders; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-10-30T09:46:34.563Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:
• Open Planner in device A 
• Open Order details screen in device B 
• Make some changes on the Planner -> do not save 
• Delete order reference from the order on device B 
• Check behavior on Planner 
 Actual result: the conflict location modal doesn't appear 
Expected result: the conflict location modal appears

---

## Bug #17378: [Android] Small grammar mistake on the Order details screen

- **URL:** [17378](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17378)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Orders; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-10-30T08:40:13.81Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Device: Samsung Galaxy A16, Android 15
Actual result: 

Expected result: 'pieces' is displayed

---

## Bug #17373: # is missed before order number on double order pop-up

- **URL:** [17373](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17373)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-29T14:06:15.14Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev
v 3.0.1_OTA_10 
 
 
Preconditions:  
• Planner is displayed -> Mode ON 
• Double orders were created

 
  
Steps: 
• Click on order box for Double orders 
• Pay attention to # before number 
  
Actual result: # is missed before order number  
 
Expected result: # should be displayed 
https://www.figma.com/design/0MOYjJmTGL4I9x770Z1sgw/Koppert-One-designs?node-id=11870-7966&t=2dxiAne9DQzvBSzD-0

---

## Bug #16944: Order details modal closes after app is hidden

- **URL:** [16944](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16944)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-09T12:38:21.69Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev  
 
 
 
 
Build: v3.0.1_OTA6  
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
 Steps: 
• Enter some qty to create a new order 
• Click on  green order box -> Order details modal appears 
• Hide the app 
• Open again 
• Pay attention to the  
  
Actual result: Order details modal closes after app is hidden 
 
Expected result: Order details modal should NOT close after app is hidden

---

## Bug #16924: Cross icon appears in Order reference field on iOS but doesn't display on Android

- **URL:** [16924](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16924)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-08T09:17:53.103Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev  
 
 
 
Build: v3.0.1_OTA5  
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
 Steps: 
• Click on any order box 
• Enter inf in Order reference field 
• Compare iOS and Android 
  
Actual result: Cross icon appears in Order reference field on iOS but doesn't display on Android @ 
Expected result: TBD

---

## Bug #16890: Users are logged out more often than expected

- **URL:** [16890](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16890)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Login; Mobile; Production; QualityAssurance
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-10-07T06:45:58.793Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Platform:  iOS+AndroidEnvironment: ProductionMob app ver: 3.0.0
Steps to Reproduce:Be logged inwaitbe logged out

Expected result: users are not logged out so fast

Note from Liliia: I checked the prod app on my side (both IOS + Android) and I am still logged in.

---

## Bug #16819: Long products names are cut off on mode OFF/ON

- **URL:** [16819](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16819)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-01T09:25:28.223Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev  
 
 
Build: v3.0.1 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
 Steps: 
• Click on any Add product  
• Find NEPHUS CONJUNCTUS/AGRIPROTECT/250 Individuals/Fles 100ml - NL00068 -> Save 
• Create order with this product  
• Pay attention to view order for this product
 
• Open mode OFF 
• Pay attention to view order for this product
 
  
Actual result: Long products names are cut off 
 
Expected result: Make field bigger to see full  product name or the name needs to be shortened and three dots added (TBD)

---

## Bug #16721: Mode ON stucks for a few second after blocked and unblocked the phone

- **URL:** [16721](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16721)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-26T07:34:49.277Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: stage 

 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
 Steps: 
• Lock the phone 
• Unlock the phone 
• Pay attention to the mode ON 
  
Actual result: Mode ON stucks for a few second after blocked and unblocked the phone 
Expected result: Mode ON should NOT stuck for a few second after blocked and unblocked the phone

---

## Bug #16720: The clickable tooltip is displayed near product's title however there is no  latin_name/common name /URL

- **URL:** [16720](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16720)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Planner; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-09-25T16:47:53.18Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:

 
1/. Open Planner -> order mode OFF 
2. Select 2100 E Artesia Blvd Enterprise 
3. Check products that are shown on the attached video 

 
Actual result: the i tooltip is displayed 
Expected result: the i tooltip is displayed only when latin_name/common name /URL is/are present

v2100

---

## Bug #16718: The search result is not cleared after tapping on X icon in the 'Add product' search field (only Android)

- **URL:** [16718](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16718)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Planner; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-09-25T13:04:58.767Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

STR:

• Open Planner -> order mode ON 
• Tap on the 'Add product' 
• Tap some data in the Search field 
• Tap on the X icon 
 Actual result: nothing happens, the data is not cleared (Android only)
Expected result: data is cleared after tapping on X icon

---

## Bug #16717: Changes are not applied when refreshing Mode ON after Price changing on User/Enterprise/Subsidiaries levels on WEB

- **URL:** [16717](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16717)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-25T12:22:19.093Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:   dev 
Build: v.2.5.16 ota 3 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• Prices are visible for products 
 Steps: 
• Open web -> turn OFF the prices
Open the Admin page and set the following options for price visibility:Subsidiary: NoEnterprise: UndefinedUser: Undefined 
 
 
 
EXPECTED RESULT 
User is NOT able to see prices on Planner for the selected enterprise 
 
 
 
• Open mobile -> mode ON is still displayed 
• Refresh the screen  
• Click on info icon  
• Pay attention to the prices -> Prices is still visible 
• Click on Cancel button  
• Click on Order node button  
• Pay attention to the prices -> Prices disappears

 
  
Actual result: Changes are not applied when refreshing Mode ON after Price changing on User/Enterprise/Subsidiaries levels on WEB 
Expected result: Changes should be applied when refreshing Mode ON

---

## Bug #16716: Value appears again after deleting for seconds + add 20 seconds pause

- **URL:** [16716](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16716)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-25T10:48:37.447Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: stage,  v3.0.0_OTA_3 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON 
• User has some orderSteps: 
  
• Delete qty -> Save 
• Pay attention to the Deleted qty 
  
Actual result: Value appears again after deleting for seconds 
 
Expected result: Deleted Value should NOT appear again -> + add 20 seconds pause

---

## Bug #16706: Days are not translated

- **URL:** [16706](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16706)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-25T08:47:42.16Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: stage,  v3.0.0_OTA_2 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• User selected another language -> Portugues 
• Planner is opened -> Mode ON 
 Steps: 
• Pay attention to the days
 
  
Actual result: Days are not translated 
 
Expected result: Days should be translated

---

## Bug #16697: Country list overlaps native phone inf (e.g. time)

- **URL:** [16697](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16697)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-24T15:01:31.077Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: stage,  v3.0.0_OTA_2 
 
 
Preconditions:• Kopppert.one is opened 
• Registration screen is displayed 
 Steps: 
• Click on Country drop-down  
• Pay attention to the Country list 
  
Actual result: Country list overlaps native phone inf (e.g. time) 

 
Expected result: Country list should NOT overlap native phone inf (e.g. time)

---

## Bug #16649: App is not opened when the app is killed

- **URL:** [16649](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16649)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-09-24T10:23:00.317Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

the link https://dev.koppert.one/register does not always redirect to the register page. if previously login screen was open, app proccess was not killed, the main login screen will be shown. 
Should be fixed before the release.

---

## Bug #16565: Orders disappear with small delay after choosing Location without orders

- **URL:** [16565](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16565)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-22T11:23:42.283Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  Android, dev 
Build: v.2.5.16 
Samsung Galaxy A35 5G, SM-A356B/DS, 14 version 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
 Steps: 
• Click on Add product 
• Pay attention to the buttons of Add product modal 
  
Actual result: Orders disappear with small delay after choosing Location without orders 
Expected result: Orders should disappear immediately after choosing Location without orders

---

## Bug #16564: Android native footer navigation overlaps buttons of Add product modal

- **URL:** [16564](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16564)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-22T10:53:50.593Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  Android, dev 
Build: v.2.5.16 
Samsung Galaxy A35 5G, SM-A356B/DS, 14 version 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
 Steps: 
• Click on Add product 
• Pay attention to the buttons of Add product modal 
  
Actual result: Android native footer navigation overlaps buttons of Add product modal 
Expected result: Android native footer navigation should NOT overlap buttons of Add product modal

---

## Bug #16563: Keyboard overlaps locations drop-down list

- **URL:** [16563](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16563)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-22T10:35:42.603Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
Build: v.2.5.16 
 

CASE 1Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One  
• User has 8-9 locations 
• Planner is displayed -> Mode ON 
 Steps: 
• Click on Locations drop-down 
• Pay attention to the keyboard 
  
Actual result: Keyboard overlaps locations drop-down list 
Expected result: Keyboard should NOT overlap locations drop-down list

CASE 2Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One  
• User has 8-9 locations 
• Planner is displayed -> Mode ON 
 Steps: 
• Click on Locations drop-down 
• Pay attention to the keyboard
https://koppertplatform.slack.com/archives/C0464PF164W/p1758537768503239 
  
Actual result:  Keyboard opens automatically when we expand Locations drop-down 
Expected result: Keyboard should NOT open automatically, only after clicking on Search icon

---

## Bug #16528: [Mobile] Registration data remains prefilled on signup page

- **URL:** [16528](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16528)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-09-18T07:30:30.25Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: iOS/Android last dev builds 
 
 
Preconditions:• Kopppert.one app is opened 
 Steps: 
• Open registration page 
• Complete all fields (both flows for koppert customer yes and no) 
• Tap Create account 
• Account created 
• Open signup page again 
  
Actual result: Registration data remains prefilled on signup page 
 
Expected result: Only email should be prefilled on login page (not signup page)

---

## Bug #16514: Active boxes on mobile should have 4 green borders

- **URL:** [16514](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16514)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Release
- **AssignedTo:** Tiffany Levens
- **Created:** 2025-09-16T14:56:49.23Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

when putting a value in the planner on mobile not all borders turn green.

### Acceptance criteria

on mobile, order boxes should have 4 green borders surrounding the mutated cells.when a mutated cell, is next to a deadline orange cell, the green border should win.when a mutated cell is within orange time window, the mutation turns the 4 borders geen.

---

## Bug #16474: The product's price is not visible in the specific case

- **URL:** [16474](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16474)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Planner
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-09-12T14:34:47.073Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: stage

STR:

• Open Planner 
• Select HUMBERTO ROMERO ORTIZ enterprise 
• Check MXVSTAR product 
 Actual result: the price is not visible in the mobile app. In the Web app it works fine.

Expected result: the product's price is visible

---

## Bug #16317: Price icon is not clickable

- **URL:** [16317](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16317)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile
- **AssignedTo:** Ivan Dutka
- **Created:** 2025-09-12T07:02:40.17Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

_(empty)_

---

## Bug #16281: [mobile] touchable UI element not react on onPress event at some random state

- **URL:** [16281](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16281)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-09-10T12:28:59.697Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

_(empty)_

---

## Bug #16280: [Android] Endless spinner after click on Create account button

- **URL:** [16280](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16280)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; PBI
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-09-10T09:46:10.727Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: 2.5.10 (200500) DEV Android 
 
 
Preconditions:• Kopppert.one app is opened 
 Steps: 
• Open registration page 
• Complete all mandatory data 
• Tap Create account 
  
Actual result: Nothing happens - Endless spinner (for both Yes/No Koppert customer)
 
 
Expected result: App proceed to next step

---

## Bug #16193: [Mobile] keyboard is dismissed when remove values from ordering cell (mostly on iOS)

- **URL:** [16193](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16193)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-08T12:36:53.72Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

_(empty)_

---

## Bug #16184: Add product/Order Reference modal appears/disappears during the data loading and app is stuck for a few seconds

- **URL:** [16184](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16184)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-08T09:44:32.663Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: Android, iOS 
 
 
Build: v.2.5.9  
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User has a lot of Enterprises with locations 
• Planner is opened on IOS 
• Planner is opened on Android
 
 Steps: 
• Open Add product/Order Reference modal on iOS 
• Create/Edit/Delete the same or another order  on Android 
• Pay attention to the Planner  on iOS 
  
Actual result: Add product/Order Reference modal appears/disappears during the data loading and app is stuck for a few seconds 
Expected result: Add product/Order Reference modal should not appear/disappear during the data loading and app should NOT stuck

---

## Bug #15723: The redirect link doesn't appear on IOS specific devices

- **URL:** [15723](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15723)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Planner
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-08-08T12:34:20.877Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Steps:
• Open Planner 
• Tap on the info icon near the product's title 
• Tap on the 'More info' button 
• Check the redirect link on the opened web mobile screen

Actual result: the link is missing. Device: iPhone 16 Pro, OS 18.5

Note: I also checked on the iPhone 13, OS 18.5, and the link is present there. So the issue seems to be device-specific.

Expected result:

---

## Bug #15684: [Mobile] Bad quality of prices icon in modal

- **URL:** [15684](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15684)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-08-05T09:54:39.597Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  Dev 
 
 
Preconditions:• App iOS/Android is opened 
• Open planner 
• Open price modal window 
• Tap on price info icon 
 Steps: 
• Observe qulity 
  
Actual result: Icon is pixelated 
 
Expected result: Icon is in appropriate quality (as on figma) 
 
Photo in attachments

---

## Bug #15417: Spaces are not handled on Mobile when creating a user

- **URL:** [15417](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15417)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-07-15T17:22:53.033Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev, stage 
 
Preconditions:• Koppert.One is opened 
 Steps: 
• Click on Create account link 
• Enter spaces in Name field 
• Fill in all required fields  
• Click on Create account button 
• Pay attention to the registration (please, look at the video)https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1750859829980589 
  
Actual result: Spaces are not handled on Mobile and user can be created with empty Name 
 
Expected result: Spaces should be handled on Mobile and user should NOT be created with empty Name

---

## Bug #15411: A lot of dots/hyphens are allow on WEB but don't allow on Mobile

- **URL:** [15411](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15411)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-07-15T11:55:33.27Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  dev, stage
 
2.4.19_OTA_2 
 
Preconditions:• Koppert.One is opened 
 Steps: 
• Click on Create account link 
• Enter a lot of dots/hyphens in Name fields 
• Pay attention to the  Name fields 
  
Actual result: A lot of dots/hyphens are allow on WEB but don't allow on Mobile 
 
Expected result: A lot of dots/hyphens should be allowed on Mobile (can be clarified)

---

## Bug #15403: Order button becomes active for a second after refreshing page when F&O = 500 and user doesn't have cash

- **URL:** [15403](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15403)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-07-14T13:59:23.17Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Version:  
2.4.19. OTA 2 dev 
 
 
 
 
 
 
 
Device: Android, iOS 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has NOT opened Planner yet -> doesn't have a cash  
• F&O = 500
 
• User opens Planner 
 Steps: 
• Swipe down to refresh the Planner screen 
• Pay attention to the warning text and Order mode button 
  
Actual result: Order button becomes active for a second after refreshing page 
 
Expected result: Order mode button should NOT become active

---

## Bug #15401: Permissions/roles are not applied when closed and opened app again

- **URL:** [15401](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15401)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Permissions
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-07-14T13:11:39.913Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev,  v2.4.19_OTA_2 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Side effects is opened  
• User doesn't have roles/permissions to see e.g. Planner 
 Steps: 
• Open WEB -> add roles/permissions to see Planner -> Save 
• Open app on mobile  
• Kill and open app again  
• Pay attention to the Planner 
  
Actual result: Planner is not displayed because Permissions/roles are not applied when closed and opened app again 
 
Expected result: Permissions/roles should be applied when closed and opened app again

---

## Bug #15374: Incorrect text is displayed and Order button becomes active after switching between tabs when F&O = 500 and user doesn't have cash

- **URL:** [15374](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15374)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-07-11T11:46:19.34Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Version: 
2.5.0. OTA 3 stage 
2.4.19. OTA 2 dev 
 
 
 
 
 
 
 
Device: Android, iOS 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has NOT opened Planner yet -> doesn't have a cash  
• User opens Side effects 
 Steps: 
• F&O = 500 
• Add two enterprises on WEB 
 
• Click Planner  
• Pay attention to the warning text -> text is correct  
• Click on More 
• Click Planner 
 
• Pay attention to the warning text and Order mode button
 
  
Actual result:  
• Incorrect text is displayed after switching between tabs when F&O = 500 and user doesn't have cash  
• Order mode  button becomes active 
  
 
Expected result:  
• Text should not changed after switching between tabs when F&O = 500 and user doesn't have cash (look at WEB) 
• Order mode button should NOT become active

---

## Bug #15266: Permission does not applied in case when turning OFF ordering module when mode ON is opened

- **URL:** [15266](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15266)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-07-03T13:17:36.013Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  v2.4.18 OTA 4 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON 
 Steps: 
• Open WEB -> Admin -> Permissions 
• Turned OFF ORDERS ORDER MODE ACCESS 

 
• Click on Appy Permissions  
• Open mobile 
• Pay attention to the Mode ON -> Continue displaying when permission is OFF  
• Confirm the order  
• Pay attention to the Mode OFF 
  
Actual result:  
• Error appears  
• Permission does not applied in case when turning OFF ordering module when mode ON is opened
 
• Users can create orders 
  
 

 
Expected result:  Permission should be applied, order will not be created and mode OFF should be open (see acceptance criteria)

### Acceptance criteria

• If user clicks order and in the meant time the order rights have been revoked, the order will not go through and user will be redirected to the place where it is allowed to be due to permissions: i.e. Order OFF screen (without visible button to go to Orders ON mode).  
  
• No user notification about changed permissions should be shown

---

## Bug #15149: Terms&cond modal jumps after appearing on Android

- **URL:** [15149](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15149)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-06-27T12:35:21.513Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev, Android v 2.4.18_OTA_2 

Samsung Galaxy A35 5GSM-A356B/DSVersion 14
 
 
Preconditions:  
• User turns on Order mode for the first time. 
  
Steps: 
• Navigate to the Order module -> Planner OFF 
• Click on Order mode button 
• Pay attention to &quot;Terms and Conditions&quot; modal 
  
Actual result: Terms&cond modal jumps after appearing 
 
Expected result: Terms&cond modal should not jump after appearing

---

## Bug #14680: There is a space between Order details modal and bottom panel on Android

- **URL:** [14680](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14680)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-05-27T09:04:28.21Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment:  Android, Build: v2.4.15

 
1) Samsung Galaxy A35 5G, SM-A356B/DS, 14 version 
2) Samsung Galaxy A16, Android 14
 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
 Steps: 
• Click on order box 
• Pay attention to the Order details modal 
  
Actual result: There is a space between Order details modal and bottom panel where mode On is visible on background 
 
Expected result: Space should NOt be present between Order details modal and bottom panel

---

## Bug #14666: [Mobile] Page is jumping when user enters email during login on ios

- **URL:** [14666](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14666)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Login; Mobile
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-05-26T09:35:49.007Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: dev (IOS and Android v.2.4.14 OTA7). 
 
Steps: 
• Open iOS app as not logged in user 
• Start typing email on login page 
  
Actual result: 
Page jumps (see video in attachments)

 
 
Expected result: 
Page is stable

---

## Bug #13763: Previous selected enterprise is displayed instead of 'No orders found on locations' text when removing Enterprises on web

- **URL:** [13763](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13763)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Enterprise; Mobile; Planner
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-03-26T11:26:03.51Z
- **Changed:** 2026-03-03T12:56:55.16Z

### Repro Steps

Environment: iOS, Android 
 
Preconditions:• User logged in to Koppert One WEB and mobile 
• User has a few enterprises  
• User has enterprise without any order but with order days 
• &quot;Planner&quot; screen is opened -> Mode OFF 
 Steps: 
• Unlink all enterprises on WEB except enterprise without any orders but with order days 
• Go to Planner on Mobile 
• Pay attention to the text on enterprise drop-down 
  
Actual result: 
• 'No orders found on locations' text is not displayed on Mode OFF (fine for mode ON) 
• Previous selected enterprise (C.J. Klept) is displayed for mode OFF  
• Correct text appears only after relogin 
 
  
 
Expected result:  'No orders found on locations' should be displayed when Enterprise without any orders is selected

---

## Bug #19662: The newest data is not displayed

- **URL:** [19662](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19662)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-20T12:23:39.017Z
- **Changed:** 2026-02-27T10:20:50.81Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Visit Report 1 is opened on WEB 
• Visit Report 1 is opened on mobile -> iosSteps: 
  
• Visit report details is displayed with some inf in Observation section
- Scoutable 1 
- Scotable 2  
• Go to WEB  
• Click on Visit Report 1 
• Add some photos to Scoutables 2 -> Save  
• Switch to mobile 
• Click on back arrow to see VR list 
• Pull down to refresh the page 
• Click on Visit Report 1 
• Pay attention to the photos for Scoutables 2  
  
Actual result:  The newest data is not displayed -> Scoutable 2 continues displaying without photo

 
 
Expected result: The newest data should be displayed  after VR list resfreshing-> Scoutable 2 should have the photo photo

---

## Bug #19635: Area for Pull to refresh is too small on iOS

- **URL:** [19635](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19635)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; PBI; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-19T12:13:14.057Z
- **Changed:** 2026-02-27T10:20:12.247Z

### Repro Steps

Environment:  dev, iOS 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Visit Report 1 is opened on WEB 
• Visit Report 1 doesn't have any inf in Observation section (not to see it)
 
• Visit Report 1 is opened on mobile -> iosSteps: 
  
• Go to WEB  
• Click on Visit Report 1 
• Click on Scautable button 
• Select any scoutable -> Save -> Section should not be displayed 
• Switch to mobile 
• Pull down  
• Pay attention to the Observation section 
  
Actual result:  Observation section doesn't appear due to Area for Pull to refresh is too small on iOS 
 
Expected result: Should be bigges as on Android

---

## Bug #19899: Orders are not displayed on Planner however thare are orders to display

- **URL:** [19899](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19899)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Planner; Regression; Web
- **AssignedTo:** Tiffany Levens
- **Created:** 2026-02-25T10:30:46.973Z
- **Changed:** 2026-02-27T08:27:03.323Z

### Repro Steps

Pre conditions 
3 GM enterprise is selected
env Stage
STR:
• Open Planner -> check data 
• Open Order list -> check data 
 Actual result: there are no orders on Planner, but there are orders on Order list

 

 
Expected result: all orders are displayed on Planner

---

## Bug #19862: 500 error on user creation

- **URL:** [19862](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19862)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Automation; BE; Regression; Self-sign up
- **AssignedTo:** Anatolii Husakovskyi
- **Created:** 2026-02-24T00:09:28.83Z
- **Changed:** 2026-02-27T08:03:53.007Z

### Repro Steps

• Open user creation page 
• Fill all fields, click Yes in Are you here to create an order account? 
• Fill additional fields 
• Click &quot;Create Account&quot; btn

---

## Bug #19054: Empty section is still displayed in visit report view mode

- **URL:** [19054](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19054)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Cool; FE; PBI
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-23T10:21:42.587Z
- **Changed:** 2026-02-25T14:48:42.91Z

### Repro Steps

Environment: dev  
 
Preconditions: 
• User has rights to access visit reports 
• User is connected to at least one enterprise 
  
Steps: 
• Open visit reports section 
• Create visit report by completing only title 
• Observe this visit report in view mode 
  
Actual result: Observations section is still displayed
 
 
Expected result: 
Not completed sections should not be displayed in view mode

Scenario 2: Hide empty sections or show the proper empty state inside cultivar Given I am viewing a visit report 
When the General section, Observations section, or both contain no data 
Then the empty sections should not be displayed and other sections should maintain proper layout 
 
When cultivar tabs exist inside observations section 
And any of cultivar tabs has no scoutable details 
Then the empty state message is shown inside such tab: &quot;No oservations inside this cultivar&quot;

---

## Bug #18485: Visit report attachments are not displayed

- **URL:** [18485](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18485)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Cool; FE; Regression; Visit reports; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-12-22T11:59:06.31Z
- **Changed:** 2026-02-25T14:31:32.64Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin / ordered + grower role + 4Evergreen Steenbergen B.V. 
 Steps: 
• Open orders visit report on web 
• Create new and add scoutable with attachments or open existing 
• Try to view the attachment 
  
Actual result: Cannot open attachments or view it
 
Expected result:  Attachments are displayed

---

## Bug #19658: Added manually Enterprise that doesn't related to Sales person disappears after removing Sales person from Entrp in F&O

- **URL:** [19658](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19658)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; BE; Enterprise; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-20T10:31:09.413Z
- **Changed:** 2026-02-23T14:11:38.34Z

### Repro Steps

Environment:  Dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
• SSO (koppert.nl) user details is displayed + Advisor role 
• Sana agent Cayaro sales person (ID = 003519) has three entrp:Cayaro Peppers B.V. 
Cayaro Peppers Zevenhuizen B.V. 
Cayaro Peppers Bleiswijk B.V. 
 Steps: 
• Enterprise tab is displayed -> Click on Edit  
• Add manually Enterprise -> e.g. C.J. Klep -> Save 
• Enterprise tab is displayed -> Click on Edit  
• Add manually Enterprise that related to Sales person-> e.g. Cayaro Peppers B.V. -> Save 
• Clic on Users tab -> Edit  
• Add Sana agent Cayaro sales person -> Save  
• Two Enterprises appear automatically
Cayaro Peppers Zevenhuizen B.V. 
Cayaro Peppers Bleiswijk B.V.
 
• Remove Cayaro Peppers Bleiswijk B.V. using trash icon -> Save 
• Go to F&O  
• Find Cayaro Peppers B.V. -> Remove sales person group where Cayaro sales person is linked -> Save 
• Run the synk  
• Go to user detail page -> Refresh  
• Pay attention to enterprises 
  
Actual result:  
• Only 2 Enterprises are displayed  
• C.J. Klep (that was added manually and doesn't related to Sana agent Cayaro sales person) disappears  
 
 
 
Expected result:  
• 3 Enterprises should be displayed 
• C.J. Klep (that was added manually and doesn't related to Sana agent Cayaro sales person) should be disaplyed

---

## Bug #19671: [Locations] Building complement is not shown in the header on the location details

- **URL:** [19671](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19671)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Locations; PBI; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-23T08:50:21.65Z
- **Changed:** 2026-02-23T11:36:20.67Z

### Repro Steps

Preconditions:
 
 -Location with a building complement exists 

 
Steps: 
• Open Organization > Locations 
• Select an enterprise that has a delivery location with a building complement, e.g. Hortalan Med, S.L. 
• Find a location with a building complement on the list

 
• Press 'View' button next to this address to see details 
• Verify header on the location details 
 Actual result: Building complement is not shown in the header 

 
Expected result: Building complement should be shown in the header

---

## Bug #18210: [PROD] Email confirmation is not received when placing orders for different companies in a row

- **URL:** [18210](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18210)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Production; QualityAssurance
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-08T13:00:32.363Z
- **Changed:** 2026-02-19T14:30:43.84Z

### Repro Steps

Environment: PROD 
 
 
Preconditions:• Kopppert.one is opened 
 Steps: 
• Link yourself to enterprise INTEGRAL FARMS PRODUCE INC - CA1-100477  
• Place order for any company  
• Place order for any other company expect to get two order-confirmations, but only get an email for the order with the first company 
• Place orders for 4 different companies is a row
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1765174497364869
 
  
Actual result: some emails are missing 
 
Expected result: The number of orders must correspond to the number of letters.

---

## Bug #19602: Enterprises don't appear after synk if all of them related to sales person are removed

- **URL:** [19602](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19602)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; PBI; User; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-18T10:29:50.58Z
- **Changed:** 2026-02-19T12:15:53.88Z

### Repro Steps

Environment:  Dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
• SSO (koppert.nl) user details is displayed 
• Sana agent Cayaro sales person (ID = 003519) has three entrp: 
Cayaro Peppers B.V.
 
Cayaro Peppers Zevenhuizen B.V.
 
Cayaro Peppers Bleiswijk B.V.
 
 Steps: 
• Click on User that has sales person -> Sana agent Cayaro  
• Click on Enterprise tab  
• Remove all Enterprises related to sales person Sana agent Cayaro to use trash icon 
Cayaro Peppers B.V. 
Cayaro Peppers Zevenhuizen B.V. 
Cayaro Peppers Bleiswijk B.V.
 
• Go to Swagger > https://api-dev.koppert.one/api -> Jobs -> /api/v1/jobs/sync-sales-persons -> Click on Run 
 
• Refresh the users details page 
• Pay attention to enterprises 
  
Actual result: Enterprises don't appear after synk  

 

 
Expected result: Three Enterprises should be added 
Cayaro Peppers B.V. 
Cayaro Peppers Zevenhuizen B.V. 
Cayaro Peppers Bleiswijk B.V.

---

## Bug #18967: When only a leadtime prodcut is in the deadline timer window, the countdown gets visualized on the first day

- **URL:** [18967](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18967)
- **State:** New
- **Area:** Digital-Services
- **Tags:** FE; Planner; QualityAssurance; Web
- **Created:** 2026-01-21T14:24:04.8Z
- **Changed:** 2026-02-18T14:25:02.173Z

### Repro Steps

Environment: dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Planner is displayed 
• Some product has lead time 
• There are any orders on location 
 Steps: 
• Add deadline timer -> ?day=19&hour=11&minute=54 
• Pay attention to the deadline timerhttps://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1768298508903199 
  
Actual result: When only a leadtime prodcut is in the deadline timer window, the countdown gets visualized on the first day 

 

 
 
Expected result: if the deadline day is not available then we should not show the countdown. (it cannot be the day you see, because we have the 1 day buffer for Leadtime products)

---

## Bug #18450: Date is not updated on Orders list but updated in Orders details after changing Confirmed ship date in F&O

- **URL:** [18450](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18450)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **Created:** 2025-12-17T15:46:25.237Z
- **Changed:** 2026-02-18T14:15:02.3Z

### Repro Steps

Environment:  stage 
Build: v.3.2.0 
 
 
Preconditions:• User open in to Koppert One 
• User has access to Order list  
• User has order on 05.01.2026 -> NL6-SO00276322
 
 Steps: 
• Order details is opened for NL6-SO00276322 
• Go to F&O -> Find NL6-SO00276322 
• Set Confirmed ship date to 07.01.2026 -> Save 
• Go to Order details for NL6-SO00276322 
• Wait -> 05.01.2026 is changed to 07.01.2026 
• Click back arrow 
• Pay attention to the date for NL6-SO00276322 on Orders list  
  
Actual result:   
• Date is not updated on Orders list but updated in Orders details after changing confirmed Confirmed ship date  
• 07.01.2026 is displayed on Order details and 05.01.2026 is displayed on Orders list 
  
Expected result: Date should be updated on orders list  (Please, look on WEB and please, don't be angry after reading this message&#128522;)

---

## Bug #19428: Order can not be finished after redirection from Solution finder and set is "isVisible": false in Customer Assortments

- **URL:** [19428](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19428)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Orders; Solution Finder; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-12T09:11:50.917Z
- **Changed:** 2026-02-18T14:08:49.353Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin role  
• User logged in to Koppert One 
• Solution Finder is opened in TAB 1 
• NL6 entrprs is selected -> to see Order button  
• Complete is selected for NL6 in Customer Assortments (Admin) in TAB 2Steps: 
  
• Click on Order button for Product 1 and Product 2 in tab 1 
• Click on Admin -> Customer Assortments ->  NL6 in tab 2 
• Select Customer Specific -> Save 
• Switch to tab 1  
• Click Complete order button:
- Simple order creation page opens
- Inputs for Product 1 and Product 2 are disabled 
• Click on +Add product  
• Select any available product from the list -> Product 3-> Add 
• Enter qty in input for Product 3 
• Click on Create order button  
• Pay attention to the Order
 
  
Actual result: Order can not be created due to error about blocked products appear even though available for ordering product is added (Product 3) 

 
Expected result: should be created

---

## Bug #16089: Error appears and page refreshes when leaving it for a few hours

- **URL:** [16089](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16089)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-08-29T08:28:12.513Z
- **Changed:** 2026-02-18T12:39:37.02Z

### Repro Steps

Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Any page is opened 
 Steps: 
• Leave the page for a few hours  
• open another tab not to see Koppert. One 
• Click on Koppert logo  
• Click on Knowledge plate 
• Pay attention to the page 
 Actual result: Error appears and page refreshes when leaving it for a few hours
 
 
Expected result: Error should NOT appear and page should NOT refreshe when leaving it for a few hours

---

## Bug #19461: Enterprises aren't added to user after deleting Entr using trash icon + add the same sales person

- **URL:** [19461](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19461)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; BE; Enterprise; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-13T11:44:34.99Z
- **Changed:** 2026-02-18T12:25:56.16Z

### Repro Steps

Environment:  Dev 
 
Preconditions:• User has Admin  
• User logged in to Koppert One  
• Users is opened 
• SSO (koppert.nl) user details is displayed 
 Steps: 
• Click on Edit 
• Add sales person -> Sana agent Cayaro -> Save 
• Click on Enterprise tab  
• Remove Enterprises one by one to use trash icon 
• Open User details again -> Sana agent Cayaro sales person continues displaying (should not) 
• Click on Edit 
• Unlink sales person to click cross icon -> Confirm 
 
• Enter the same sales person name in Search  -> Sana agent Cayaro 
• Select and save changes 
• Pay attention to enterprises 
  
Actual result: Enterprises aren't added to user  
 
Expected result: Enterprises should be added because we added sales person again

---

## Bug #19144: Wrong modal on order update

- **URL:** [19144](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19144)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Planner
- **AssignedTo:** Stanislav Iliashchuk
- **Created:** 2026-01-27T10:14:54.373Z
- **Changed:** 2026-02-17T10:17:31.723Z

### Repro Steps

• Create order or open existing one
 
 
• Remove product by clicking on trash icon -> confirm order line deletion in the 'delete order line' modal  
• Add new product, set q-ty 
• Save changes
 
 Expected result:  
Show “Order confirmation” modal

Actual result:
“Deleting quantities” modal appears.

More context and discussion: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1769505895983059

---

## Bug #19092: Some password formats is not getting accepted on user creation

- **URL:** [19092](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19092)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Automation; Self-sign up
- **Created:** 2026-01-23T15:41:32.46Z
- **Changed:** 2026-02-17T08:08:09.313Z

### Repro Steps

Steps to reproduce:
 
 
• Create user 
• Get verification link from email 
• Open it, set password like:
Somephrase123!
 
• You will be logged in automatically, log out 
• Try to log in again

Actual result:
401 error on login attempt 
 
 
More context: currently password like 1234567890 works, but if you try to log in just after user activation (via script), it still shows 401 error, if you patiently wait for 5-10 second, you'd be able to log in. So there is some time consuming password processing after user activation

---

## Bug #18946: [BE] 500 error instead of 403 in case of insufficient permissions

- **URL:** [18946](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18946)
- **State:** Done
- **Area:** Digital-Services
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-20T11:49:34.777Z
- **Changed:** 2026-02-17T08:06:22.227Z

### Repro Steps

Login with user that have Role lower than admin
Access to resource that is forbidden to this user

Actual:
Got 500 error Invalid token type

Correct:
Get 403 error

---

## Bug #18883: no translation for the pests.

- **URL:** [18883](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18883)
- **State:** Done
- **Area:** Digital-Services
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-15T12:53:13.37Z
- **Changed:** 2026-02-17T08:05:46.197Z

### Repro Steps

no translations exist for the pests

---

## Bug #19367: Locations and Products syncs fail on production

- **URL:** [19367](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19367)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Production
- **AssignedTo:** Stanislav Iliashchuk
- **Created:** 2026-02-05T11:53:08.857Z
- **Changed:** 2026-02-17T07:49:29.48Z

### Repro Steps

_(empty)_

### System Info

Syncs fail consistently on Production because of too much memory being used. Optimize them to reduce the amount of used memory.

---

## Bug #19418: The Verification status doesn't change on User's profile after user accepts the invitation and logs in to the app

- **URL:** [19418](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19418)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; Login; Web
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-11T14:08:13.84Z
- **Changed:** 2026-02-16T13:00:38.877Z

### Repro Steps

STR:
• Create a new user 
• Accept the invitation that was received on Email
 
• Set up a password ->Log in to the app 
• Log in as Admin in another browser window
 
• Open Users 
• Search for a user from Step 3 
• Check 'Verification' status 
 Actual result: 'Not verified' status is displayed however user is already logged in to the app

Expected result: 'Verified' status is displayed for logged in user

---

## Bug #19432: User can't login after the logout, error about incorrect credentials is shown

- **URL:** [19432](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19432)
- **State:** Done
- **Area:** Digital-Services
- **AssignedTo:** Yuliya Halamay
- **Created:** 2026-02-12T11:50:10.147Z
- **Changed:** 2026-02-13T11:01:31.647Z

### Repro Steps

Environment: dev
 
Preconditions:

 
Steps:• Log into the Koppert.One as a user with permissions to create users 
• Open Admin > Users and create a new user with a valid email 
• Open the registration link from the received 'Activate Your Account' email 
• Enter password/confirm password and login into the system 
• Being logged in, click on the user name on the right side and press 'Log out' -> user is logged out (or open Koopert.one in another browser/incognito mode) 
• Try to log in again using an email from step 2 and a password set in step 4 
 Actual result: Error 'Incorrect email or password' is shown

 
Expected result: User is successfully logged in 

 
Note: it doesn't happen on stage environment

---

## Bug #18969: The sync fails if the salesperson has more than 100 linked enterprises

- **URL:** [18969](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18969)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; Production; QualityAssurance; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-22T07:34:58.79Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR: 

•  Via Admin panel, Link a user to salesperson  jaruiz@koppert.es 
•  2. expect 100+ enterprises to be linked 
 
Actual result: Only  18 enterprises are linked
Expected result: all enterprises are linked to the user

---

## Bug #18953: [Prod] Enterprise search is not working in enterprise selector

- **URL:** [18953](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18953)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Production; QualityAssurance
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-20T17:17:35.8Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:  Prod 
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1768923263949659 
 
Preconditions:• User is logged in 
• Couple enterprises (10+) are linked to the user 
 Steps: 
• Try to search by enterprises in enterprise selector 
  
Actual result: No results 
 
Expected result: Search is working properly

---

## Bug #18943: [BE] [Mobile] The 500 error appears when adding/deleting enterprises from user's account, 'No locations' is displayed on More screen in mobile app

- **URL:** [18943](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18943)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Mobile; Production
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-20T09:38:22.323Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:

• Open Admin panel -> Users 
• Search for your test user 
• Add/delete some enterprises from account 
• Open mobile app 
• Check More screen 
 Actual result: 'No locations' is displayed until user relogins 

Expected result: locations are displayed on More screen

---

## Bug #18262: [PROD] Orders not visible on planner for week 49

- **URL:** [18262](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18262)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; PRD; Production; QualityAssurance
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-12-09T08:03:31.35Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1765262456946539 
Environment: PROD 
 
 
Preconditions:• Kopppert.one is opened 
 Steps: 
• Link yourself to any NL6 enterprise 
• Go to Orders list: See orders for week 49 on the orders page.  
• Go to Planner: See no order for week 49 
• Observe 
  
Actual result: Orders not visible on planner for week 49  
 
Expected result: Same orders that is on orders list should be visible on planner 
Attachments:
 Context: I also see a similar issue for a US company (US1-118515), where the orders for week 50, 51 and 52 are not showing, but the order for week 1, 2026, is showing on Planner. But for the US, I could find multiple companies that doe have orders visible on Planner in week 49. 

Context 2: The only company for which I was able to see an order for week 49 in Planner, is Polish (PL1-999342)

---

## Bug #18098: The 'eye' icon is displayed in the Enterprise selector, 'Edit' button is absent when user opens his/her visit report from deeplink

- **URL:** [18098](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18098)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Regression; Visit reports; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-02T14:43:11.733Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Pre conditions 
User receives email updates when creating/updating visit report 

 
STR:
• Create a visit report 
• Go to emails and open the link from email 
• Check the opened visit report

Actual result: The 'eye' icon is displayed in the Enterprise selector, 'Edit' button is absent 

Expected result: no'eye' icon in the Enterprise selector, Edit button is present in the visit report

---

## Bug #18097: Location is not displayed in the opened visit report by a user who is not assigned to that Enterprise

- **URL:** [18097](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18097)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Regression; Visit reports; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-02T14:22:32.89Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Pre conditions 
 
User 1 received an email after creating a visit report for Enterprise 1 
User 2 is NOT linked to the Enterprise 1 
User 2 has access to visit reports

STR:

 
• Share as User 1 the deeplink for viewing a visit report from email to User 2 
• Log in to the Koppert One as User 2 
• Open the deeplink as User 2

Actual result: user 2 can see the Visit report, but the location is empty

Expected result: the location is displayed

---

## Bug #18057: Error displayed during orders creation on order details page for Agrifirm Zwaagdijk

- **URL:** [18057](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18057)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Order List; Regression
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-12-01T15:37:52.52Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: stage 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Agrifirm NVE BV enterprise is selected 
 Steps: 
• Open orders list 
• Press &quot;Create order&quot; 
• Selecte location Agrifirm Zwaagdijk 
• Add product and try to select the date 
  
Actual result: Invalid date NaN 

Expected result: Date selected (on planner this product and location is ok)

---

## Bug #18055: Unhandled BE error appears when creating an order for Blocked enterprise on Orders list

- **URL:** [18055](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18055)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; Regression; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-01T15:35:40.553Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:
 

 
• Open Orders list 
• Select an enterprise where ordering is possible 
• Click on the 'Create order' button 
• Change the enterprise in the selector to the Blocked one 
• Add product and quantity 
• Click on the 'Create order' button

 
 Actual result: Unhandled BE error appears
Expected result: The proper error appears ?

---

## Bug #18052: Incorrect (Released) statuses is displayed for Blocked and Scheduled orders in Orders list/Details

- **URL:** [18052](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18052)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-01T14:23:48.873Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: stage 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders list is displayed 
• User has linked Enterprises with orders:
- Blocked 
- Scheduled 
 Steps: 
• Pay attention to the statuses for 
- Blocked - Scheduled
- Delivered - NL6-SO00276361 
• Click on View Details  
• Pay attention to the statuses for - Blocked - Scheduled
- Delivered - NL6-SO00276361
https://koppertplatform.slack.com/archives/C0464PF164W/p1764598530277229 
  
Actual result: Incorrect (Released) statuses is displayed for Blocked, Scheduled, Delivered orders in Orders list/Details

 

 

 
Expected result: TBD

---

## Bug #18045: Added products disappear from list in case edit order + return to edit mode again

- **URL:** [18045](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18045)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Order List; Regression; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-01T09:42:19.727Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:

• Open Orders list 
• Select some order -> Edit 
• Delete/add some products -> Save 
• Go to edit mode again 
• Add some products 
• Check behaviour 
 Actual result: added products disappear from list
Expected result: products do not disappear after adding

---

## Bug #18012: Order note doesn't move to another line in Order Log

- **URL:** [18012](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18012)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-28T16:01:02.357Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: stage 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders list is displayed 
• User has linked Enterprises without any orders 
• User doesn't accept Terms and Conditions 
 Steps: 
• Click on any View details or Create a new order 
• Add the max letters in Order note -> Save 
• Pay attention to the Order note line 
  
Actual result: Order note doesn't move to another line
 
Expected result: Order note should be moved to another line (TBD)

---

## Bug #18008: Order is displayed without Location in Order details in case when Location is only exist in our DB

- **URL:** [18008](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18008)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Orders; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-28T14:18:50.91Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: stage 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders list is displayed 
• User has linked Enterprises with same locations but different erp_key
- 4Evergreen Steenbergen B.V.  - erp_key = 5637268326
- 4Evergreen Steenbergen B.V.  - erp_key = 5639448324 doesn't exist in F&O
- both location are displayed in DB and unmarked as archived

 
• 
 
 Steps: 
• Click on on View details for order that don't exist on F&O but displayed in DB

 
• Pay attention to the Location 
  
Actual result: Order is displayed without Location 

 
Expected result: Order should be displayed with Location

---

## Bug #18005: 'Terms and Conditions' appears in orders list after switching Enterprise

- **URL:** [18005](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18005)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-28T12:16:25.767Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: stage 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders list is displayed 
• User has linked Enterprises without any orders 
• User doesn't accept Terms and Conditions 
 Steps: 
• Click on any Create order button -> Terms and Conditions modal doesn't appear appear due to 18004 bug 
• Change the Enterprise 
• Pay attention to the Terms and Conditions modal 
  
Actual result: 'Terms and Conditions' appears in orders list after switching Enterprise  
Expected result: 'Terms and Conditions' should not appear in orders list after switching Enterprise

---

## Bug #18004: 'Create order' button doesn't work in case when 'Terms and Conditions' is not accepted and there any orders in Orders list

- **URL:** [18004](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18004)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-28T11:52:18.1Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: stage 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders list is displayed 
• User has linked Enterprises without any orders 
• User doesn't accept Terms and Conditions 
 Steps: 
• Click on any Create order button 
• Pay attention to the 'Create order' button and Terms and Conditions modal
 
  
Actual result: 'Create order' button doesn't work in case when Terms and Conditions is not accepted and there any orders in Orders list 
Expected result: Terms and Conditions modal should appear

---

## Bug #17922: Visit report title doesn't have a hover state when truncated

- **URL:** [17922](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17922)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** QualityAssurance; Visit reports; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-27T15:08:52.82Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:
• Go to Visit reports 
• Check the report when a title is long and truncated 
• Hover on it 
  
Actual result: no tooltip on the VR title in the Visit Report List

Expected result: tooltip appears when hovering on VR title

---

## Bug #17863: Incorrect button on the leave guard

- **URL:** [17863](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17863)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Visit reports; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-25T11:15:21.323Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Actual result:

 

Expected result:

---

## Bug #17859: Leave guard appears when changing location on the Edit Visit report page

- **URL:** [17859](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17859)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Visit reports; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-25T10:18:04.327Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:
• Open some Visit report -> Edit 
• Change location 
• Check behavior 
 Actual result: Leave guard appears when doing no changes 

Expected result: Leave guard appears only if some changes were made on the page

---

## Bug #17820: Ordesr can be created/edited on archived Location in case when qty entered and page doesn't refresh

- **URL:** [17820](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17820)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-21T12:32:23.193Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• Swagger is opened -> https://api-dev.koppert.one/api/#/Jobs/syncLocations -> Jobs-> /api/v1/jobs/sync-locations 
• DB is opened -> psqldb-dev-westeurope-001 -> Databases -> psqldb-dev-westeurope-001Schemas -> public -> Locations  
• User has Admin + Allowed Country Advisor roles -> to see Mode On 
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• Location 1 is active -> 4Evergreen Steenbergen B.V. 
 
 
CASE 1
Steps: 
• Add qty for Product on Location 1 -> not to Save 
• Mark Location 1 as archived in DB -> Save 
• Go to Swagger -> Click on Execute 
• Switch to the Planner with unsaved order 
• Click on Order button -> Confirm 
• Pay attention to the Order on  Location 1 
  
Actual result: Order can be created/edited on archived Location in case when qty entered before archived
 
 
Expected result: Order can NOT be created/edited on archived Location -> Toast message should be shown  

Preconditions:
• Orders list is opened 
 CASE 2Steps: 
• Mark Location 1 as archived in DB -> Save 
• Go to Swagger -> Click on Execute 
• Pay attention to the order on for archived location 
• Click on + Create order  
• Expand Locations drop-down  
  
Actual result:  
• Archived location is displayed in Locations drop-down 
• A new order can be created on archived location 
  
Expected result: Archived location should not be displayed in Locations drop-down -> Toast message should be shown

---

## Bug #17754: Ammount is N/A after order update on orders list

- **URL:** [17754](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17754)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** BE; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-11-21T10:19:30.37Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Precondition: Open order from orders list 
 
STR: 
• Edit order data & save 
 AR: Amount is N&A 
 
ER: Amount is displayed after changes

---

## Bug #17753: Status:"OPEN" is displayed for Cancelled order after cancelling more than one product

- **URL:** [17753](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17753)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-21T10:15:29.617Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened -> Mode On  
• User has order with 
Product 1/2/3 
 Steps: 
• Click on View details  
• Click on trash icon for Product 1/2/3 -> Save 
• Click on Confirm on leave guard  
• Pay attention to the order status 
  
Actual result:  
• Status: &quot;OPEN&quot; is displayed in response for Cancelled order after cancelling more than one product 
 
• Status: &quot;OPEN&quot; doesn't change to Cancelled on Orders list and Order details

 
  
Expected result: Cancelled should be displayed

---

## Bug #17752: Order details crashes after opening Order Log

- **URL:** [17752](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17752)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-21T09:52:45.99Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened -> Mode On  
• User has order with Product 1  
 Steps: 
• Click on View details  
• Click on Order log 
• Pay attention to the Order log
 
  
Actual result: Order details crashes after opening Order Log  
Expected result: Order log page should be displayed

---

## Bug #17728: Amount in CAD currency is not fully visible and without hover on Orders page

- **URL:** [17728](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17728)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-11-19T16:03:08.843Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Precondition: Have enterprise of Canada subsidiary selected where any Amount in Cad is available. (E.G Exploron Corporation on dev env.) 

 
I Assume that might be the case for every 3 letters currency (like MXN etc.) 

 
STR: 
• Open Orders page 
• Observe Amount column for such enterprise  
 AR: Amount in CAD is cut and no hover tooltip is shown 

 
ER: Extend the Amount column width to max possible (fitable) size that does not break the orders list table (have a look if possible to leave the current CAD amount without truncating, like: CAD 291,99). If amount still does not fit (too big), then truncate and add a hover tooltip to show the full amount.

---

## Bug #17724: The full list of items doesn't appear after selecting a value and opening drop down in the 'Link to Sales person' field

- **URL:** [17724](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17724)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Regression; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-19T13:29:44.743Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:

• Open Admin panel -> Users 
• Select some user -> Edit 
• Scroll down to the 'Link to Sales person' field 
• Click on the Search icon in the field 
• Search for 'Ernst'
 
• Select the available item from drop down 
• Click on the drop down icon 
• Check the available options 
 Actual result: only the 'Ernst ter Meulen' option is available in the opened drop down
Expected result: All available options appear when opening drop down

---

## Bug #17722: The text color of the pre-selected value doesn't change when activating Search in the 'Scoutables' selector

- **URL:** [17722](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17722)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-19T12:35:17.83Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:

• Open Visit reports 
• Click on the '+ Scoutable' button 
• Click on the selector so drop down opens 
• Select some item from drop down 
• Click on the 'Search' icon

Actual result: The text color of the pre-selected value doesn't change 
Expected result: the text color of the pre-selected value changes to #6B887F

---

## Bug #17720: The Search is not active after tapping on the Search icon and moving out in the 'Enterprise' selector

- **URL:** [17720](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17720)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-19T11:32:24.15Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:

• Open Planner ->  'Enterprise' selector 
• Click on the Search icon 
• Move the mouse out of the field 
 Actual result: the search is not active anymore 
Expected result: the search stays active, and the user can type

---

## Bug #17706: The Search is activated after opening drop down and not clicking on the Search icon itself

- **URL:** [17706](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17706)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-18T11:05:03.087Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:

• Open Sign up form  
• Click on the Search icon in the 'Country' field 
• Click somewhere outside 
• Click on the drop down in the 'Country' field 
 Actual result: The Search state is activated, the cursor is blinking
Expected result: Search state is not activated, only drop down with the list of countries is opened

---

## Bug #17701: Newer visit reports showing at the bottom (not all cases)

- **URL:** [17701](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17701)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Production; QualityAssurance; Visit reports
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-18T09:43:28.55Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR:
• Open Visit reports on Prod 
• Select enterprise 'Koppert One do not deliver'
 
• Check the list with visit reports

Actual result: 

Expected result: newer visit reports are displayed at the top of the list

---

## Bug #17697: 'L' is missed in pop-up message for Cancelled order on details

- **URL:** [17697](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17697)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-17T14:05:17.037Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened -> Mode On  
• User has order with Product 3 - is cancelled 
 Steps: 
• Click on View details for order with cancelled product 
• Click on Edit 
• Pay attention to the pop-up 
  
Actual result: 'L' is missed in pop-up message for Cancelled order on details 
Expected result: Cancelled should be displayed

---

## Bug #17694: Name is not displayed for Scoutables

- **URL:** [17694](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17694)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Scoutables; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-17T13:24:48.73Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Admin page is opened -> Scoutables 
• 
 
 Steps: 
• Click on some Scoutable 
• Pay attention to the Name  
  
Actual result: Name is not displayed for Scoutables 
Expected result: Name should be displayed for Scoutables

---

## Bug #17672: The 'Add' button is active after deselecting the product in the 'Add product' modal

- **URL:** [17672](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17672)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Planner
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-13T13:30:09.227Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

STR: 
• Open planner 
• Click on the 'Add product' 
 
• Select some product from the list 
• Deselect it 
• Check the Add button 
 Actual result: The 'Add' button is still active
Note: the issue doesn't reproduce in the scenario when adding the first product to the Planner

 
Expected result: The 'Add' button is greyed out after deselecting a product

---

## Bug #17671: Old name is displayed instead of a new one in toast message after editing user Name

- **URL:** [17671](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17671)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; FE; Organization; QualityAssurance; User; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-13T12:52:34.947Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Admin/Organization is opened -> Users 
•  
 Steps: 
• Click on user name -> Edit 
• Change the Name -> Save 
• Pay attention to the toast message
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1762948990595309
 
  
Actual result: Old name is displayed instead of a new one in toast message after editing user Name 
 
Expected result: New one should be displayed

---

## Bug #17632: 'Create order' button is active for Enterprise with one Location where purpose : "Invoice"

- **URL:** [17632](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17632)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-12T13:21:12.223Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Orders list is  
• Sone Entr with one Location where purpose : &quot;Invoice&quot; -> Gospodarstwo Ogrodnicze Jarosław Ginalski 
 Steps: 
• Select this Entr  
• Pay attention to the Create order button -> is active 
• Click on Create order  
• Pay attention to the app 
  
Actual result: • Create order button is active for Enterprises with one Location where purpose : &quot;Invoice&quot; 
• App reloads with errors after clicking on Create order button

 
  
Expected result: there is No locations set up' empty state should be shown and no button

---

## Bug #17631: Incorrect text id displayed after clicking on 'Create order' button for Enterprise without locations

- **URL:** [17631](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17631)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-12T13:13:39.26Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Orders list is opened -> Mode On  
• Sone Entr doesn't have locations 
 Steps: 
• Select Entr without Locations 
• Click on Create order  
• Pay attention to the text 
  
Actual result: Order mode blocked. Please contact Koppert. text appears for Entr without locations

 
Expected result: TBD

---

## Bug #17587: 'Create order' button is active for Enterprises with invalid ERP key or invalid Enterprise

- **URL:** [17587](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17587)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-11T13:06:29.183Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Orders list is opened -> Mode On  
• Sone Entr has e.g. invalid ERP key  
 Steps: 
• Select this Entr  
• Pay attention to the Create order button  
• Click on Create order  
• Pay attention to the app 
  
Actual result: 
• Create order button is active for Enterprises with invalid ERP key or invalid Enterprise
 
• App reloads with errors after clicking on Create order button 
  
Expected result: Create order button should be disabled for Enterprises with invalid ERP key

---

## Bug #17578: Scheduled order displayed as cancelled on Order details

- **URL:** [17578](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17578)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-10T14:44:22.07Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Build: v3.1.0 , stage 
 
Preconditions:• User is log in Koppert one 
• Orders list is displayed 
• F&O is displayed 
• Usr has some order  
 Steps: 
• Change order to Scheduled -> Save  -> NL6-SO00276144 
• Pay attention to the Scheduled on  Order details 
  
Actual result: Scheduled order displayed as cancelled on Order details on WEB 

 

 
Expected result: Scheduled order (products) should be visible but Edit should be blocked

---

## Bug #17577: Remove qty appears again after refreshing the page during order is processing

- **URL:** [17577](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17577)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Mobile; Ordering - mobile; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-10T14:26:03.89Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Build: 3.1.0_OTA_2 Stage 
 
Preconditions:• User is log in Koppert one 
• Planner is displayed 
• User has a few orders 
 Steps: 
• Remove qty for product -> Save   
• Refresh the page during order is processing 
• Pay attention to the removed qty 
 
  
Actual result: Remove qty appears again after refreshing the page during order is processing 
Expected result: Remove qty should NOT appear again after refreshing the page during order is processing

---

## Bug #17575: After enterprise is deleted and created again, some F&O synchronisation breaks

- **URL:** [17575](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17575)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Order List
- **AssignedTo:** Stanislav Iliashchuk
- **Created:** 2025-11-10T11:17:44.243Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

ENV: prod.

Enterprise: erp NL6-33200
 

 
Problem: the enterprise was deleted on PROD, then added again. Now, some of it's product prices are missing, although they exist in F&O. As a result, several products are not displayed in Ordering UI, although they exist as orderlines in F&O, such as (by product ID): 08020, 07900, 02528.
 

 
Expected result: after the enterprise is deleted and recreated, all of the data is synced with F&O correctly, and subsequent scheduled syncs work as expected.

---

## Bug #17540: CE Deeplink to Visit Report doesn't work if the user is not connected to the enterprise

- **URL:** [17540](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17540)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Visit reports
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-07T11:21:17.96Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: dev, stage, prod. 

 
Enterprise: any.  

 
Steps to reproduce:  
• Create a visit report with an email notification to the active user. 
• Ensure that the recipient user is not connected to the enterprise of the Visit Report. 
• Wait for the email notification about the Visit Report.  
• Try to navigate to the Visit Report by the link from the notification. 
 Actual result: the user briefly sees the enterprise of the Visit Report in the selector, in read-only mode, but then is redirected back to the visit report list with a 500 error. 

 
Expected result: the user is navigated to the Visit Report and allowed to view it in read-only mode, even if they're not connected to the enterprise of that Visit Report. 
 

 
See attachments.

---

## Bug #17538: Orders do not exist in the BE response for date ranges in the past

- **URL:** [17538](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17538)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; Web
- **AssignedTo:** Stanislav Iliashchuk
- **Created:** 2025-11-07T10:55:30.743Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: dev. 

 
Enterprise: Inbeca, Natural Enemies LLC.

Steps to reproduce:  
• Open planner for one of the mentioned enterprises. 
• Select date range from jan 1 2023 to dec 31 2023. 
• Check the network tab.  
 Actual result: the orders structure (weeks and dates) is there, but the orders arrays are empty:

Expected result: orders should exist.

---

## Bug #17503: 0 is displayed in input after deleting product and adding it again on Orders details

- **URL:** [17503](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17503)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-05T14:49:02.29Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Orders list is opened -> Mode On  
• User has order with Product 1 Product 2  
 Steps: 
• Click on View details -> Edit 
• Click on trash icon for Product 1 
• Click on Add product link 
• Add the product that was removed from step 2 
• Pay attention to the input  
  
Actual result: 0 is displayed in input after deleting product and adding it again on Orders details
 
 
Expected result: Empty input should be displayed

---

## Bug #17482: : (colon) is missed in time in Order Log

- **URL:** [17482](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17482)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; Ordering; Orders; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-05T08:55:54.787Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened -> Mode On  
• User has order with some products 
  
• Click on View details for order with cancelled product 
• Click on Order log 
• Pay attention to the : (colon)  
  
Actual result: : (colon) is missed in time in Order Log  
Expected result: : (colon) should be added in time

---

## Bug #17436: 0 appears after qty removing on Orders details

- **URL:** [17436](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17436)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-04T09:40:48.59Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: dev 
 
Preconditions:• User logged in to Koppert One  
• Order details page is opened 
• User has a few locations 
• User has some order 
 Steps: 
• Click on View details -> Edit 
• Remove qty  
• Pay attention to the field 
  
Actual result: 0 appears after qty removing 

 
Expected result: Empty field should be displayed (please, look at stage)

---

## Bug #17435: Cancelled order can be edited in Order details if open Planner in tab 1 and Order details in tab 2

- **URL:** [17435](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17435)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-04T09:08:42.527Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• User has order with Product 1 in tab 1
 
 Steps: 
• Open order with Product 1 in Orders list in tab 2 
• Remove qty for  Product 1 on Planner -> Confirm 
• Wait when processing is finished 
• Switch to order with Product 1 in Orders list in tab 2  
• Click on Edit -> removed qty is available for editing  
• Change the qty -> Save 
• Pay attention to the cancelled order 
  
Actual result:  
• Cancelled order can be edited in Order details 
• Cancelled order appears again on Planner and show incorrect qty  
• Qty that was cancelled appears on Orders details after refreshing 
 
  
Expected result: Cancelled order can NOT be edited in Order details

---

## Bug #17394: Qty (1) appears for disabled product with lead time

- **URL:** [17394](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17394)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-31T09:55:52.89Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened -> Mode On  
• User has order with Product 1Product 2Product 3 with lead time + deadline timer -> APHIDALIA/100/BAG 
 Steps: 
• Click on +Create order  
• Click on Add product 
• Add some products 
• Add product with lead time + deadline timer -> APHIDALIA/100/BAG -> input is disabled 
• Click on Save -> Confirm  
• Pay attention to the product with lead time 
  
Actual result: Qty (1) appears for disabled product with lead time
 
Expected result: Qty (1) should NOT appear for disabled product with lead time

---

## Bug #17391: [KO] is displayed in response after Order note has been deleted

- **URL:** [17391](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17391)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-30T18:36:42.3Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• User has order with Order note
 
• Dev tools is displayed -> Network 
 Steps: 
• Click on order box  
• Clear order note -> Save 
• Pay attention to the note in response 
  
Actual result: [KO] is displayed in response after Order note has been deleted 
Expected result: Empty string should be

---

## Bug #17387: Order box disappears with delay/continue displaying after product cancellation

- **URL:** [17387](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17387)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-30T12:43:41.12Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• User has order with one Product 
 
 Steps: 
• Click on View details 
• Remove qty or enter 0 for product -> Save 
• Open Planner 
• Pay attention to the order box for cancelling order  
  
Actual result: Order box disappears with delay/continue displaying after product cancellation 

Expected result: Order box should disappear immediatelyhttps://koppertplatform.slack.com/archives/C0464PF164W/p1761825957362859?thread_ts=1761823688.480989&cid=C0464PF164W

---

## Bug #17386: Product can not be deleted using trash icon on Order details

- **URL:** [17386](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17386)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; Ordering; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-30T12:31:37.527Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened -> Mode On  
• User has order with Product 1Product 2
 
 Steps: 
• Click on View details for order/ + Create order  
• Click on trash icon for Product 1 
• Pay attention to the Product 1 
  
Actual result: Product can not be deleted using trash icon on Order details 
Expected result: Product must be deleted using trash icon on Order detailshttps://koppertplatform.slack.com/archives/C0464PF164W/p1761825957362859?thread_ts=1761823688.480989&cid=C0464PF164W

---

## Bug #17385: Order log doesn't show updates to 0 after product was cancelled

- **URL:** [17385](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17385)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order; Order List; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-30T12:20:13.633Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened -> Mode On  
• User has order with Product 1Product 2Product 3 - is cancelled 
 Steps: 
• Click on View details for order with cancelled product 
• Click on Order log 
• Pay attention to the Cancelled product  
  
Actual result: Order log doesn't show updates to 0 after product was cancelled
 
Expected result: Order log should show updates to 0 after product was cancelledhttps://koppertplatform.slack.com/archives/C0464PF164W/p1761825957362859?thread_ts=1761823688.480989&cid=C0464PF164W

---

## Bug #17384: Edit button is disabled when one product is cancelled on Order Details

- **URL:** [17384](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17384)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; Ordering; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-30T12:09:43.417Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened -> Mode On  
• User has order with 
Product 1
Product 2
Product 3 - is cancelled 
 Steps: 
• Click on View details for order with cancelled product 
• Pay attention to the Edit 
  
Actual result: Edit button is disabled when one product is cancelled on Order Details
 
Expected result: Edit button should NOT disabled when one product is cancelled on Order Details
https://koppertplatform.slack.com/archives/C0464PF164W/p1761825957362859?thread_ts=1761823688.480989&cid=C0464PF164W

---

## Bug #17383: Product 1 affects Product 2 qty when decreasing Product 1

- **URL:** [17383](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17383)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-30T11:11:21.263Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• F&O is opened 
• User has order with 
Product 1 - 1001
Product 2  - 999 
 Steps: 
• Decrease 999 to 998 -> Click on Order button -> Confirm  
• F&O shows: 
Product 1 - Qty = 1001, Deliver reminder = 1001Product 2  - Qty = 999, Deliver reminder = 998
 
• Open Planner  
• Decrease 1001 to 1000 -> Click on Order button -> Confirm  
• Pay attention to the Product 2 
  
Actual result: Product 1 affects Product 2 qty when decreasing Product 1
F&O shows: Product 1 - Qty = 1001, Deliver reminder = 1000Product 2  - Qty = 998, Deliver reminder = 998 
Expected result: Product 1 should NOT affected Product 2 qty when decreasing Product 1

---

## Bug #17382: [Dev] names are displayed as null on visit report

- **URL:** [17382](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17382)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; QualityAssurance; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-10-30T10:32:17.177Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: Dev 
Preconditions: 
 
 
 
 
• Kopppert.one dev is opened 
 Steps: 
• Login 
• Open visit report
 
• Select edit and open scoutable selector 
 Actual result:  Names are null  
 
 
Expected result:  Names are displayed correctly

---

## Bug #17374: No thumbnails generation

- **URL:** [17374](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17374)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE
- **AssignedTo:** Ievgen Shemonaiev
- **Created:** 2025-10-29T14:15:07.197Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Thumbnails are not generated, there is only one link for the product image, and it shows a full-sized image. No query-parameter sizing as well (which could be done with Azure CDN Image Processing).

---

## Bug #17347: 'Select scoutable' text is displayed outside the field for Portuguese

- **URL:** [17347](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17347)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Visit report; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-28T15:36:45.347Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: dev, stage 
 
Preconditions:• User logged in to Koppert One  
• Visits report is opened 
• User has a few locations 
• User is selected Portuguese in My profile 
 Steps: 
• Click on + Create visit  
• Click on scoutable 
• Pay attention to the text in 'Select scoutable' field 
  
Actual result: 'Select scoutable' text is displayed outside the field for Portuguese  
 
Expected result: 'Select scoutable' text should not displayed outside the field for Portuguese

---

## Bug #17332: Qty clears after entering 0 on Planner/Order details

- **URL:** [17332](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17332)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-28T12:43:28.927Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: dev 
 
Preconditions:• User logged in to Koppert One  
• Planner/Order details page is opened 
• User has a few locations 
 Steps: 
• Enter 0 instead of qty for future order  
• Pay attention to the 0https://koppertplatform.slack.com/archives/C0464PF164W/p1761642728092659 
  
Actual result: Qty clears after entering 0 on Planner/Order details 
 
Expected result: 
• - Zero can not be entered for order creation (on Planner and Orders list) 
• - Zero can be entered and displayed for order editing (on Planner and Orders list)

---

## Bug #17297: Second modal appears after deletion confirmation

- **URL:** [17297](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17297)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-10-22T12:00:12Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: Dev 
Preconditions: 
 
 
 
 
• Kopppert.one is opened by user with orderer role or admin role  
 Steps: 
• Open planner 
• Delete order value and press confirm on the modal 
• Observe 
 Actual result:  Confirmation modal is displayed for second time 
 
 
Expected result:  Order deleted after first confirmation 
 Video in attachments 

Upd: Second scenario

When multiple orders updated and at least one order line is updated with Zero (or empty cell) - show only Remove order line popup - Now user will see 2 modals one by one

---

## Bug #17293: Visit report email sending takes a lot of time (10-15 min)

- **URL:** [17293](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17293)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Production; QualityAssurance; Visit report; Visit reports; Web
- **AssignedTo:** Tiffany Levens
- **Created:** 2025-10-21T15:11:04.54Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: prod 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Current Enterprise has a lot of users 
• Visits report page is opened 
 Steps: 
• Click on + Visit report 
• Fill in all required fields 
• Select some user for E-mail notifications 
• Click on + Create Visit report button 
• Pay attention to the time for Visit report email sending 
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1761034729214549
 
  
Actual result: Visit report email sending takes a lot of time (10-15 min)
 
Expected result: Should be faster (TBD)

---

## Bug #17290: No leave guard on order creation

- **URL:** [17290](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17290)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Production; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-10-21T14:42:38.497Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: PROD 
Preconditions: 
 
 
 
 
• Kopppert.one is opened 
 Steps: 
• Login 
• Open Orders list with linked enterprise 
• Press create order 
• Add product with quantity and other data 
• Press on Planner tab 
 Actual result:  No leave guard 
 
 
Expected result:  Leave guard pop-up appears 
Video in attachments

---

## Bug #17289: Azure services don't work locally

- **URL:** [17289](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17289)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE
- **AssignedTo:** Ievgen Shemonaiev
- **Created:** 2025-10-21T14:39:11.897Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

_(empty)_

---

## Bug #17287: Wrong product number title in product info modal

- **URL:** [17287](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17287)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Production; Web
- **AssignedTo:** Vladyslav Mahdenko
- **Created:** 2025-10-21T13:54:28.577Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: PROD 
Preconditions: 
 
 
 
 
• Kopppert.one is opened 
 Steps: 
• Login 
• Open planner with linked enterprise 
• Open product info modal 
 Actual result:  common.products.productNumber 
 
 
Expected result:  Modal displayed correctly with valid titles

---

## Bug #17227: Inf from Cultivar 2 moves to Cultivar 1 if information is not saved for cultivar after visit report creation

- **URL:** [17227](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17227)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Regression; Visit report; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-20T13:03:00.077Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: stage 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Visits report is opened 
 Steps: 
• Click on + Visit report 
• Fill in all required fields
 
• Add Cultivar 1 without any information  
• Click on Tick to save 
• Add Cultivar 2 with some information 
 
• Don't click on Tick  
• Click on + Create Visit report 
• Pay attention to the Cultivar 1
NOTE: the same for edit 
  
Actual result: Inf from Cultivar 2 was moved to Cultivar 1 
Expected result: 
• on create report click ->- highlight the unsaved tab and do not create a visit report until the tab is saved/removed- scroll the page to get name field in view (add this inf from comments below) 
• if removing the tab (clicking on cross sign) with unsaved information -> show leave guard

---

## Bug #16994: Latin name and Product name are placed in one field for mode OFF

- **URL:** [16994](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16994)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; PRD; Production; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-13T08:26:10.93Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: dev, stage, prod 
 
 
 
 
 
 
 
 
 
 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Planner is displayed -> Mode OFF 
 Steps: 
• Select Units per Products/Grouped by beneficial 
• Pay attention to the  lines of text inside one cell
https://koppertplatform.slack.com/archives/C0464PF164W/p1760085177867589 
 Actual result: Both names are squeezed into one field 
 
 
Expected result:

---

## Bug #16948: Tab icon is missed after turn On/Off shipping methods

- **URL:** [16948](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16948)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; FE; Regression; Shipping Methods; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-09T13:29:11.52Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: dev, stage 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

 

Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Admin is displayed -> Shipping methods page 
•  
 Steps: 
• Turn any Active toggle On  
• Turn another Active toggle Off  
• Repeat  
• Pay attention to the Tab icon 
• Repeat on Enterprise level 
 Actual result:  Tab icon is missed after turn On/Off shipping methods 

 
 
Expected result: Tab icon should NOT missed after turn On/Off shipping methods

---

## Bug #16868: 'Order notesʼ field continues displaying as disabled in edit mode after redirection from Planner

- **URL:** [16868](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16868)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order; Order List; Ordering; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-03T08:36:25.997Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: dev 
 
 
 
 
 
 
 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Planner is displayed 
• Some order for the future + order category was created on Enterprise 1 
 Steps: 
• Select Enterprise 2 
• Select Enterprise 2 
• Click on order box for the future + order category 
• Click on redirection link 
• Click on Edit 
• Pay attention to the Order notes field
NOTE: reproduced time to time 
 Actual result: 'Order notesʼ field continues displaying as disabled in edit mode after redirection from Planner 
 
 
Expected result: 'Order notesʼ field should not be disabled in edit mode c

---

## Bug #16867: 'Scheduled Order' is displayed instead of only 'scheduled' in multiple pop-up

- **URL:** [16867](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16867)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-03T08:09:19.11Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Env: dev 
 
 
 
 
 
 
 
 
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Planner is displayed 
• Some order for the future was created 
 Steps: 
• Go to F&O  
• Create scheduled order for the same day that simple order was created -> find instruction how to create scheduled orders in Wiki 
• Open Planner 
• Pay attention to the multiple pop-up with scheduled order 
 Actual result: 'Scheduled Order' is displayed instead of only 'scheduled' in multiple pop-up

 
 
 
Expected result: Only 'Scheduled' should be displayed

---

## Bug #16776: Inconsistency with text when locations are not selected between Planner and Visit Reports

- **URL:** [16776](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16776)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-30T10:02:13.043Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: dev 
 
 

Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Planner is opened 
• Visit report is opened 
 Steps: 
• Click to Select all check box to uncheck all locations on Planner and Visit Reports 
• Pay attention to the text into field
https://koppertplatform.slack.com/archives/C0464PF164W/p1758620027249469?thread_ts=1758619974.360439&cid=C0464PF164W
 
 Actual result: Inconsistency with text when locations are not selected between Planner and Visit Reports

 
 
Expected result: 'Select location' should be displayed on Planner

---

## Bug #16648: Location without orders are displayed in mode OFF in case when only one order is placed and was deleted

- **URL:** [16648](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16648)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-24T09:52:27.35Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:   dev 
Build: v.2.5.16 ota 2 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• There is one Location without any orders 
 Steps: 
• Click on Add product 
• Add product -> Add qty -> Save  
• Click on Order button -> Location Agriom B.V 
• Open Mode OFF 
• Click on Locations drop-down -> Location Agriom B.V appears 
 
• Open Mode ON
 
• Delete current order on Location Agriom B.V -> Save
 
• Open Mode OFF
 
• Click on Locations drop-down 
• Pay attention to the Location without any orders 
  
Actual result: Location without orders are displayed in mode OFF 
Expected result: Location without order should NOT displayed in mode OFF

---

## Bug #16142: Enterprise is not displayed after removing previously linked Entrp and added sales person

- **URL:** [16142](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16142)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; Enterprise; FE; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-01T12:13:24.81Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment: stage 
 
 
Preconditions:• Koppert.One is opened 
• Admin is displayed 
• User has linked Enterprises 
• User doesn't have Sales person

 
 Steps: 
• Click on any user -> Edit 
• Removed previously linked Entrp 
• Add any sales person: 
• • Milenco v Helteren (ES1) 
• Jeremy Webber (US1) 
• Cristobal Vicente Álvarez (MX1) 
• Joanna Luttikhuizen (CA1) 
  
• Save 
• Pay attention to the EnterpriseNOTE: case is also reproduces when some Enterprise has already linked (without removing)  
  
Actual result: Enterprise is not displayed after removing previously linked Entrp and added sales person (Only after page refreshing) 
Expected result: Should be showed after linking

---

## Bug #15708: Double order created on Prod

- **URL:** [15708](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15708)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; hotfix; Lag Buster; Production; QualityAssurance
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-08-07T09:01:28.343Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1754555350422159
 
 
 

CASE 1
Environment: Prod 
 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One on web  
• Enterprise selected: Kwekerij De Noordhoek B.V. 
  

 
Steps: 
• https://koppertplatform.slack.com/files/U08QEMX0PN2/F09A340MELQ/20250807-1144-39.3408800.mp4
 
  
Actual result: Double order created 1 second away from each other

 
 Expected result: Double order should not be created 

 
CASE 2
Steps: 
• User create an order 
• Pay attention to the order
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1762335470932809
 
  
Actual result:  
• order came in twice, 5 seconds apart. 
• email got delivered twice

 
  Expected result: Double order should not be created

CASE 3
Actual result:  

 Expected result: Double order should not be created

---

## Bug #15645: Pagination settings should be removed from team page

- **URL:** [15645](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15645)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-07-31T06:51:31.183Z
- **Changed:** 2026-02-12T15:35:08.363Z

### Repro Steps

Environment:  dev 
 
Preconditions:• Kopppert.one is opened 
• User has Admin or role to view team page 
 Steps: 
• Open Organization -> Team 
• Observe 
  
Actual result: Pagination settings is available  
 
Expected result: By design its not visible anymore

---

## Bug #19357: [User creation] user is getting logged out after sign up completion

- **URL:** [19357](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19357)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Automation; PBI; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-02-05T10:00:16.647Z
- **Changed:** 2026-02-11T13:27:42.427Z

### Repro Steps

• Create user 
• Open link from invitation email 
• Fill &quot;Complete your Profile&quot; modal, click &quot;Go to Koppert one&quot; button 
 Expected result:
User stay signed in, user see &quot;User details are successfully updated&quot; toast.

Actual result:
User is getting logged out 

ENV: Stage

---

## Bug #19409: Incorrect text is displayed on Hover Tooltip after selection Entrpr without Locations

- **URL:** [19409](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19409)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Solution Finder; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-10T20:33:51.28Z
- **Changed:** 2026-02-11T10:28:26.933Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One  
• Some Entr doesn't have locations 
• Entr without locations is selected -> - A. Ammerlan  
• A. Ammerlan is Blocked and at the same time has one Location = Invoices

 
 Steps: 
• Click on Knowledge -> Solution Finder  
• Click on Order button  
• Pay attention to the text 
  
Actual result: Incorrect text is displayed on Hover Tooltip after selection Entrpr without Locations 
 
 
Expected result: &quot;No locations available&quot; should be displayed

---

## Bug #18647: [PROD] User can't be found in the sales persons list

- **URL:** [18647](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18647)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Production; QualityAssurance
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-12-30T13:26:55.783Z
- **Changed:** 2026-02-09T15:33:12.527Z

### Repro Steps

Environment:  Prod
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1767100335581269
 
 
Preconditions:• User is logged in 
• Admin -> Users ->  User without linked sales person opened 
 Steps: 
• Try to link a user to 002648 Cristina Prados Fern in edit mode
 
  
Actual result: Can't find  002648 Cristina Prados Fern in the list link to sales-person
 
 
Expected result: 002648 Cristina Prados Fern should be available in the list

---

## Bug #13105: Digital Assistant doesn't load after hiding and opening the app

- **URL:** [13105](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13105)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Digital Assistant; Mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-02-18T13:01:06.723Z
- **Changed:** 2026-02-09T11:29:27.767Z

### Repro Steps

Version: 2.2.3 
Device: iOS, Android 
 
Preconditions: 
• User is logged in to Kopper One mobile app  
 Steps: 
• Click on Digital Assistant button -> Digital Assistant chat is displayed 
• Hide the app  
• Open another app 
• Wait a few seconds (30-45) 
• Open Kopper One again 
• Pay attention to the Digital Assistant  
 Actual result: Digital Assistant doesn't load after hiding and opening the app 
 
Expected result: Digital Assistant should be loaded after hiding and opening the app

---

## Bug #14155: NL6-SO00157320 order is displayed on Planner but does not exist in F&O

- **URL:** [14155](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14155)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** BE; Lag Buster; Planner; Web
- **Created:** 2025-04-16T15:04:40.973Z
- **Changed:** 2026-02-04T13:17:36.517Z

### Repro Steps

Environment:  dev. 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened 
• Enterprise is  Bakker Seed Productions B.V. 
• Location is Bakker Seed Productions B.V., new building compliment 
• There is an order on 01-05 Thu - 29 pieces on Bakker Seed Productions B.V., new building compliment location - NL6-SO00157320 
  
Steps: 
• Open Bakker Seed Productions B.V., new building compliment for  Client1 and Client 2 
• Go to F&O  
• Delete #NL6-SO00157320 
• Go back to Client1 and Refresh the page -> order NL6-SO00157320 disappers from Planner 
• Go to Client 2 -> 'Conflict locations' modal has not appears yet 
• Edit/Add Order details for NL6-SO00157320 -> Save  
• Go to Client 1 
• Pay attention to the NL6-SO00157320  
   

 
Actual result:  
• NL6-SO00157320  is still displayed for Client 2  
• NL6-SO00157320  appears for Client 1 
• NL6-SO00157320  does not exist in F&O
 
  

 
 

 

 
Expected result:  NL6-SO00157320 order should NOT be displayed on Planner if it does not exist in F&O

---

## Bug #18968: [Prod] User sees orders in Planner that do not exist in F&O

- **URL:** [18968](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18968)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; QualityAssurance
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-21T15:27:12.517Z
- **Changed:** 2026-02-04T13:08:16.807Z

### Repro Steps

Environment:  Prod 
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1768809082806229
 
 
Preconditions:• User is logged in prod 
• User is linked to Valstar Bleiswijk - NL6-62185 
• User has access to planner 
 Steps: 
• Go to Planner, see orders before week 52 in Planner 
  
Actual result: Orders exist 
 
Expected result: Orders for this enterprise do not exist for week before 52 because they are not available in  in F&O 

Context:
 there are two enterprises in f&O with the same ERP-key, NL6-62185
 It seems related to a merge that was done via F&O. I can confirm that there used to be a customer called Gebr. Valstar Calathea. Now there is a customer name Valstar Bleiswijk, with a location called Gebr. Valstar Calathea.

---

## Bug #19194: Statuses and 'View' are not translated

- **URL:** [19194](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19194)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Notifications; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-29T09:01:52.277Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One  
• Entr has a few locations 
• Planner is opened 
 Steps: 
• Click on My profile -> Select Português 
• Click on Planner  
• Add qty -> Order button 
• Pay attention to the email notification NOTE: translations applies for visit reports 
  
Actual result: Statuses and 'View' are not translated 
 
 
Expected result: should be translated

---

## Bug #19173: General sections is not displayed if only attachment added

- **URL:** [19173](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19173)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Visit report; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-28T08:24:34.42Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment: dev  
 
 
Preconditions: 
• User has rights to access visit reports 
• User is connected to at least one enterprise 
  
Steps: 
• Open visit reports section 
• Create visit report by completing only title and attachment 
• Observe this visit report in view mode 
  
Actual result: General section with attachment is not displayed 
 
Expected result: 
If section contains data or attachment it should be displayed in view mode

---

## Bug #18966: Unhandled error appears and empty page is displayed for deleted user after editing

- **URL:** [18966](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18966)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-21T14:06:22.9Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Admin page is opened 
• 
 
 Steps: 
• Click on User 1 in tab 1 
• Click on User 1 in tab 2 
• Click on Edit in tab 1 -> Delete User 1 -> Confirm  
• Click on Edit in tab 2 -> Edit some inf -> Save 
• Pay attention to the page 
• Refresh the page 
• Pay attention to the page
 
 Actual result:  
• Unhandled error appears during editing 
 
• Empty screen is displayed after refreshing  
  
 
Expected result:  
'should be displayed 
• 'User not found' message is displayed 
• Users list should be opened

---

## Bug #18932: Visit reports + new cultivar can not be created when added space

- **URL:** [18932](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18932)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Production; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-19T15:56:21.107Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment: prod 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Visits report is displayed 
 Steps: 
• Click on Create visit report button  
• Add Name 
• Add a few emails 
• Select Location with cultivar  
• Add a new cultivar  
• Add space after or before cultivar name 
• Add a  new scoutable  
• Click on Create visit report button 
• Pay attention to the visit report 

Note: the same for Edit ->  
• Add a new cultivar  
• Add a  new scoutable  
• Click on Save 
  
Actual result: Visit reports + cultivar can not be created 

 
 
Expected result:  Should be created. Cultivar names should be trimmed.

---

## Bug #18873: 500 appears for Scoutable creation

- **URL:** [18873](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18873)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; BE; Regression; Scoutables
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-14T14:33:22.687Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Admin is displayed -> Scoutables 
 Steps: 
• Click on +Create scoutables  
• Enter all required fields 
• Click Create scoutable button 
• Pay attention to the error and a new scoutable 
  
Actual result: 500 appears for Scoutable creation
 
Expected result: 200 should appears for Scoutable creation

---

## Bug #18866: Search doesn't work in the 'Country' selector

- **URL:** [18866](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18866)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Regression; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-13T15:03:12.53Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

STR:

• Open Sign up page
 
• Search in the 'Country' selector 
• Check result 
 Actual result: search is not working 
Expected result: the data appears according to the search input

---

## Bug #18865: Spike memory on BE after opening specific user's page from Team page

- **URL:** [18865](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18865)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Organization; Regression; Team; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-13T14:42:23.97Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

STR:

• Login to the Koppert One 
• Click on the Organization tab 
• Search for Basic stage user 
• Click on View 
 Actual result: The user's profile is always loading, and after BE stops working 

Expected result: user's profile is opened after clicking on View button

---

## Bug #18863: Cursor doesn't move according to Product after green line appears for unsaved changes

- **URL:** [18863](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18863)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-13T12:02:20.017Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment:  dev, stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is displayed  
• User has 3 products
Addit/2,5l/NL
Airobreez Charger EU
 
Aphid-Biostation

 
 Steps: 
• Enter qty for the Second product -> Airobreez Charger EU 
• Enter some letter in Search  
• Pay attention to the Cursor 
  
Actual result: Cursor doesn't move according to Product after green line appears for unsaved changes -> is displayed for Addit/2,5l/NL

 
Expected result: Cursor should be moved according to Product after green line appears for unsaved changes -> should be displayed for Airobreez Charger EU

---

## Bug #18861: [Visit reports] The error appears after deleting the last cultivar, adding new observations and saving it

- **URL:** [18861](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18861)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Regression; Visit reports; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-13T10:40:03.07Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

STR:

 
• Open an existing visit report with cultivars and observations 
• Delete all cultivars 
• Add new observations without creating a Cultivar 
• Try to save the VR 
 Actual result: the BE error appears

Expected result: no error, the VR is saved

---

## Bug #18793: Added product to visible in filtered results

- **URL:** [18793](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18793)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Planner; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-09T09:59:00.17Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
 Steps: 
• Open planner add mark Addit product as added 
• Select pest filter to Aphidis 
• Observe 
• Add another product and press Add 
  
Actual result: Added product is not displayed in filtered results (when it should by family) 
Addit is not added in when modal is closed (Check video) 
 
Expected result: 2 products should be added

---

## Bug #18784: POlish enterprises show Euro's in Planner, everywhere else it's Zloty

- **URL:** [18784](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18784)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; QualityAssurance; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-08T12:26:19.993Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment: prod 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Planner is displayed 
• Enterprise is PL 
 Steps: 
• Select a Polish enterprise
 
• Go to Planner 
• Click the product-information button for any product 
• Pay attention to the currencyhttps://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1767857487694769 
  
Actual result: POlish enterprises show Euro's in Planner, everywhere else it's Zloty 
 
Expected result:  Zloty should be -> In all other places, the correct prices show up, in the correct currency

---

## Bug #18747: Order button is not displayed when there are unsaved changes for multiple locations

- **URL:** [18747](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18747)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-06T15:26:27.617Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
 Steps: 
• Open planner, make changes for multiple locations 
• Try to search not existing product 
  
Actual result: Order button is not displayed 

 
Expected result: Order button and discard changes button are displayed

---

## Bug #18597: Order reference is not display with truncation and hover functionality

- **URL:** [18597](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18597)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-30T09:25:34.197Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment: dev 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders is displayed 
• Some order has order reference with 60 characters 
 Steps: 
• Click on order number  
• Click on order reference with 60 characters 
• Pay attention to the order reference with 60 characters 
  
Actual result: Order reference is not display with truncation and hover functionality 
Expected result: Order reference should be displayed with truncation and hover functionality

---

## Bug #18466: 500 appears on Orders list for ESP Entr -> COAGRISAN OPFH 1011/551 DI

- **URL:** [18466](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18466)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Mobile; Orders; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-19T14:39:36.06Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• COAGRISAN OPFH 1011/551 DI  Entrp is displayed 
• F&O = 500 
 Steps: 
• Create order on Planner -> Save 
• F&O =  200 
• Redirect from Planner to Order details for order from step 2 
• Click on Back arrow 
• Click on Orders list 
• Pay attention to the Orders list  
  
Actual result: 500 appears on Orders list for ESP Entr -> COAGRISAN OPFH 1011/551 DI 
 
Expected result:  200 should be displayed with orders

---

## Bug #18360: Clickable area for cultivar controls is too small

- **URL:** [18360](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18360)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; QualityAssurance; Visit report; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-15T08:35:54.953Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Visits Report is displayed 
 Steps: 
• Enter some test in Cultivar tab 
• Click near the tick icon  
• Pay attention to the area around the tick icon
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1765534735327969
 
  
Actual result: Clickable area for cultivar controls is too small 
 
Expected result: Should be bigger

---

## Bug #18111: Visit reports are not loaded on the page if Enterptise contains a lot of locations

- **URL:** [18111](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18111)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Regression; Visit reports; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-03T09:57:16.313Z
- **Changed:** 2026-02-04T11:54:19.057Z

### Repro Steps

STR:

• Link 'Inbeca' Enterprise to your user 
• Open Visit reports 
• Check behaviour

Actual result: Visit reports are not loaded, the request is failed

Expected result: the list of visit reports is displayed

---

## Bug #18512: Green border doesn't appear when qty is removed

- **URL:** [18512](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18512)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-23T09:47:53.41Z
- **Changed:** 2026-02-04T11:07:35.853Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see Orders 
• User logged in to Koppert One 
• Orders pahe is displayed 
 Steps: 
• Click on View details 
• Click on input  
• Remove the qty 
• Pay attention to the input border  
  
Actual result: Green border doesn't appear when qty is removed 
Expected result: Green border should appear when qty is removed, please look on mobile (Mobile video in attachments)

---

## Bug #19272: 'Create account' and 'Cancel' buttons are cut off during incorrect registration

- **URL:** [19272](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19272)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Mobile; Regression; Single Sign On
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-02T09:29:58.677Z
- **Changed:** 2026-02-02T15:03:41.807Z

### Repro Steps

Environment:  stage 
 
 
 
 
Build: v3.3.0 

 
Preconditions:
• Koppert One log in is displayed 
 Steps: 
• Click on Create account button 
• Enter invalid inf in Name, E-mail address fields 
• Click on Create account button  
• Pay attention to the 'Create account' and 'Cancel' buttons 
  
Actual result: 'Create account' and 'Cancel' buttons are cut off during incorrect registration 
Expected result: Should be fully visible (as after scrolling)

---

## Bug #19273: ʼOpen order' button text is wrapping with too big space

- **URL:** [19273](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19273)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Notifications; Order; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-02-02T09:42:09.187Z
- **Changed:** 2026-02-02T12:57:10.277Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One  
• Entr has a few locations 
• Planner is opened 
 Steps: 
• Click on My profile -> Select Português/Francais  
• Click on Planner  
• Add qty -> Order button 
• Pay attention to the email notification 
 
  
Actual result: ʼOpen order' button text is wrapping with too big space 
 
 
Expected result: should be smaller or should use the space to the right to get wide

---

## Bug #19208: Updated shipping name is not displayed after changing shipping method name in Admin

- **URL:** [19208](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19208)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order; PBI; Shipping Methods
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-29T12:53:16.37Z
- **Changed:** 2026-01-29T15:36:26.13Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One  
• Entr has a few locations 
• Order details is opened 
• Shipping methods page is displayed 
 Steps: 
• Click on Edit for order  
• Select some shipping method -> Naztest  
• Save  
• Find Naztest in Shipping methods page 
• Edit -> Change the Name -> Test..... 
• Save 
• Open order from step 2 -> Edit 
• Click on Order log  
• Pay attention to the Shipping methods name 
  
Actual result:  
• Updated shipping name is not displayed after changing shipping method name in Admin  
• Naztest continues displaying instead of Test  
  
Expected result: Should be updated

---

## Bug #19138: [Natutec Scout] Linked Location doesn't appear for a user on Locations page until clearing data in browser and relogin

- **URL:** [19138](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19138)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Natutec Scout; Web
- **Created:** 2026-01-26T15:19:28.063Z
- **Changed:** 2026-01-29T14:13:07.967Z

### Repro Steps

STR: 
• Create a location 1 as User 1 
• Open Team -> users 
• Select User 2 
• Go to Edit mode -> give access for Location 1 for User 2 
• Log in as User 2 
• Check Locations 
 Actual result: Location 1 is not visible for User 2 until clearing data in the browser or creating a new location by User 2

Expected result: User 2 sees location 1 on the Locations page after refreshing a page

---

## Bug #19100: [Natutec Scout] Some translations are not working for Scoutables

- **URL:** [19100](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/19100)
- **State:** New
- **Area:** Digital-Services
- **Tags:** Natutec Scout; Web
- **Created:** 2026-01-26T13:26:02.79Z
- **Changed:** 2026-01-29T14:12:59.8Z

### Repro Steps

STR:
 
 1. Open Test location Lilia 
2. Liliia departmnet 
3. Check Thresholds, Scout Preferences 

 
Actual result: some data is not translated

 

 

Expected result: all data is translated

---

## Bug #13728: [Digital Assistant ] 404 is displayed when leaving DA after decreasing the page

- **URL:** [13728](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13728)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Digital Assistant; Regression; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-03-21T13:40:55.72Z
- **Changed:** 2026-01-28T14:07:20.69Z

### Repro Steps

Environment: stage  
Preconditions: 
• User has only Admin role 
  
Steps: 
• Navigate to Side Effects 
• Decrease the page 
• Click on Digital Assistant  
• Leave page for an hour 
• Pay attention to Digital Assistant 
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1742563121855239 
  
Actual result: 
404 is displayed

 

 
Expected result: 
404 should not displayed and DA should be uploaded

---

## Bug #16747: User is not logged out immediately from app after deleting account

- **URL:** [16747](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16747)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Automation; QualityAssurance; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-09-26T12:32:11.073Z
- **Changed:** 2026-01-28T10:53:51.02Z

### Repro Steps

STR: 

 
• Login to Koppert One app 
• Delete account 
• Check the pages in Koppert app 
 Actual result: User can navigate between empty pages since BE return errors

Expected result: user is logged out from app after deleting the account

---

## Bug #18773: [Prod] Missing locations for enterprise Valto B.V. - NL6-61709

- **URL:** [18773](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18773)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Production; QualityAssurance
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-08T07:59:42.78Z
- **Changed:** 2026-01-28T09:59:44.147Z

### Repro Steps

https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1767852828175279
Environment:  Prod. 
 
Preconditions:• Planner opened 
• User is linked to enterprise Valto B.V. - NL6-61709 
  
Steps: 
• Check planner in order mode 
   
Actual result: There are no possibility to create orders because of missing locations 
 
Expected result: User should be able to add orders because there are two locations in F&O (purpose delivery and business)

---

## Bug #18804: [Natutec Scout] Creating a location in Natutec Scout is currently impossible

- **URL:** [18804](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18804)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Natutec Scout; Production; QualityAssurance; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-12T10:29:13.467Z
- **Changed:** 2026-01-27T09:30:20.993Z

### Repro Steps

STR:
 

• Have a Natutec Scout account -> Log in 
• Create a (indoor) location 
• Try to save 
 Actual result:  it fails with toaster message &quot;The address you entered is invalid&quot;

Note: link to conversation in Slack
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1767885093059209

Expected result: It's possible to create a location

---

## Bug #18944: Leave guard appears when add attachments to scoutable and remove it  for VR creation

- **URL:** [18944](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18944)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** FE; Visit report; Visit reports; Web
- **AssignedTo:** Mykola Pavlyk
- **Created:** 2026-01-20T10:16:25.16Z
- **Changed:** 2026-01-26T14:50:23.7Z

### Repro Steps

Env: dev  

 
 
Steps: 
• Click on +Visit Report button 
• Click on +Scoutable button   
• Click on Attachments 
• Attach some file 
• Remove attached file 
• Click on another page or tab 
• Pay attention to the leave guard  
   
Actual result: Leave guard appears 
 
Expected result: Leave guard should not appear

---

## Bug #18182: Double order pop-up overlaps Products when decreasing the screen

- **URL:** [18182](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18182)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** FE; Planner; Web
- **AssignedTo:** Mykola Pavlyk
- **Created:** 2025-12-05T14:36:01.403Z
- **Changed:** 2026-01-26T14:41:00.713Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Planner is displayed 
• User has double order  
 Steps: 
• Click on order box for double order  
• Decrease the screen  
• Pay attention to the pop-up 
  
Actual result: Double order pop-up overlaps Products when decreasing the screen 
Expected result: TBD

---

## Bug #18973: ʼPlease, finish your ordering...' pop-up appears for order without any data

- **URL:** [18973](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18973)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-22T10:03:39.387Z
- **Changed:** 2026-01-22T12:38:09.75Z

### Repro Steps

Environment: dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles  
• User logged in to Koppert One 
• Orders list  is displayed -> Create order page 
• Product 1 with lead time 
 Steps: 
• Select a Product 1 -> qty input is disabled 
• Select next day (23.01) -> qty input is active 
• Enter some qty 
• Select previous day (22.01) -> qty input is disabled 
• Select 23.01  -> qty input is active and qty was cleared 
• Select 22.01 
• Click on Back arrow  
  
Actual result: ʼPlease, finish your ordering...' pop-up appears for order without any data

 
Expected result:  ʼPlease, finish your ordering...' pop-up should NOT appear because input field is empty

---

## Bug #18912: The Timing Expert is not translated if select the Nederlands language

- **URL:** [18912](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18912)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Nematodes Radar; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2026-01-16T11:00:08.497Z
- **Changed:** 2026-01-21T09:54:34.6Z

### Repro Steps

STR:

• Log in as not Basic user 
• Open Settings -> change language to Nederlands 
• Open More -> Check Timing expert 
 Actual result: it's not translated 

Expected result: Timing expert is translated

---

## Bug #15833: Edit and Create Visit Reports leave guard when form is back to original state

- **URL:** [15833](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15833)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Visit report; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-08-14T11:46:48.427Z
- **Changed:** 2026-01-20T10:10:32.11Z

### Repro Steps

CASE 1 
Steps:

• Open any Visit Report  
• Press edit 
• Enter some value into any field
 
• Erase that value 
• Try to navigate away from the pag 
 Actual behaviour:
Leave Guard is displayed. 

 
Expected behaviour: Since the form is functionally back to its original state, no Leave Guard should be displayed.  

CASE 2 (the same as Case 1 but another steps) 
Steps: 
• Click on +Visit Report button/Edit 
• Make any changes  
• Select another Enterprise 
• Click on Discard button 
• Select another Enterprise 
• Select another Enterprise 
• Pay attention to the leave guard  
   
Actual result: Leave guard appears without any changes 
Expected result: Leave guard should appear when any changes have been making  
  

CASE 3Steps: 
• Click on +Visit Report button/Edit 
• Add +Scoutable (48 sec on video) 
• Add one more +Scoutable  
• Don't touch the other pages and Enterprise 
• Remove the last Scoutable  
• Add one more +Scoutable  
• Remove both Scoutable one by one 
• Select another Enterprise 
• Pay attention to the leave guard message (Please, look at the video 15972 case2 from 47 sec) 
  
Actual result: Leave guard doesn't appear  
Expected result: Leave guard should appear

### System Info

Env: DEV, STAGE, PROD

---

## Bug #18112: User's email is still selected in the email selector after switching enterprise in Visit report

- **URL:** [18112](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18112)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Regression; Visit reports; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-03T10:24:47.533Z
- **Changed:** 2026-01-19T11:33:10.033Z

### Repro Steps

STR:
• Open new visit report 
• Select some users in the Email notifications selector
 
• Switch Enterprise 
• Check the users list in the Email notifications selector 
 Actual result: user's email is still selected after switching Enterprise 
Expected result: everything is cleared, no user's email is selected in the list

---

## Bug #17485: The order is visible in planner (through the grey box) but doesn't show the product that was ordered in the list

- **URL:** [17485](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17485)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; Production; QualityAssurance; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-05T10:28:40.373Z
- **Changed:** 2026-01-19T10:43:10.27Z

### Repro Steps

Actual result:

 
This order is visible in planner (through the grey box) but doesn't show the product that was ordered in the list, nor can this product be added to the list through Add-products.

 
 
These orders are invisible on planner, all have a single product in them ''Aphiscout''. 
#NL6-SO00277602  (can open logbook) 
#NL6-SO00275183  (can open logbook) 
#NL6-SO00275184 (cannot open logbook)

 
 
important context: this company was removed from Koppert One, and re-added.

 
Note: they are all products with warnings in F&O, orders are open. order lines are open.
 
warnings say &quot;This is a leadtime product&quot; & &quot;Leadtime 3days

Slack : https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1762240151080319

---

## Bug #18859: Order details modal continues displaying for order after double orders are cteated

- **URL:** [18859](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18859)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** FE; Planner; Regression; Web
- **Created:** 2026-01-13T09:59:07.063Z
- **Changed:** 2026-01-13T12:38:00.163Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is displayed for User 1
 
• Orders list is displayed for User 2
 
• User has order -> Fri 16-01 on Location 1 
 Steps: 
• Click on order box for User 1 
• Doesn't touch Order details modal for User 1 
• Open Orders list -> Create order button for User 2 
• Select Location 1 
• Add Product + qty + reference + note + shipping -> Save  
• Go back to open order details modal on Planner for User 1  
• Pay attention to the Order details modal for User 1 
  
Actual result: • Inputs become disabled under Order details modal due to double orders have been created 
• Order details modal continues displaying  
  
Expected result: Order details modal should be closed after double orders are created

---

## Bug #18862: Wrong product line is focused after changes during search

- **URL:** [18862](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18862)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** FE; Planner; Regression; Web
- **Created:** 2026-01-13T12:00:55.07Z
- **Changed:** 2026-01-13T12:07:20.573Z

### Repro Steps

Environment:   stage 
 
Preconditions:• User has Admin / Orderer + grower
 
• User has linked enterprise 
 Steps: 
• Open planner 
• Type 'A&quot; in product search 
• Edit value for product that is not first in the row 
• Observe 
  
Actual result: Product is moved to the top (by requirements) but focus remains the same (same cell remains focused)

 
Expected result: After value changes the same product cell should be in focus

---

## Bug #18860: Wrong shipping method is selected

- **URL:** [18860](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18860)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Regression; Shipping Methods; Web
- **Created:** 2026-01-13T10:19:08.053Z
- **Changed:** 2026-01-13T10:28:14.683Z

### Repro Steps

Environment:   stage 
 
Preconditions:• User has Admin/Grower+orderer role 
• User logged in to Koppert One 
• Planner is displayed 
• Some orders precreated 
 Steps: 
• Select C.J klep enterprise 
• Open order details for previously created order 
• Try to change shipping method 
  
Actual result: Wrong shipping method is selected after selecting &quot;Naztest nl6&quot;

 
Expected result: User can select shipping method from the list

---

## Bug #16077: Successful pop up appears on More after fast switching between screens

- **URL:** [16077](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16077)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Planner
- **Created:** 2025-08-28T09:04:51.877Z
- **Changed:** 2026-01-09T14:20:37.053Z

### Repro Steps

Environment: dev, v2.5.3, iOS 
 
Preconditions:• Koppert.One is opened 
• Planner is opened on -> Mode ON 
 Steps: 
• Create and save Order  
• During the saving click on More very fast and few times 
• Pay attention to the Enterprise
 
  
Actual result: Successful pop up appears on More after fast switching between screens 
 
Expected result: Successful pop up should be only displayed on Planner mode On

---

## Bug #17505: Input field is active after closing Conflict location modal

- **URL:** [17505](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17505)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-06T08:58:56.56Z
- **Changed:** 2026-01-09T13:01:00.237Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• User has order  
 Steps: 
• Remove/edit qty on Location 1 -> don't save 
• Open Location 1 in tab 2  
• Make any changes -> Save 
• Pay attention to the input from step 1 
  
Actual result: Input field is active after closing Conflict location modal 
 
Expected result: Input field should not be active after closing Conflict location modal

---

## Bug #17726: Order that is placed via webshop that is not appearing on planner but is in the list of orders

- **URL:** [17726](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17726)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; Production; QualityAssurance; Web
- **AssignedTo:** Tiffany Levens
- **Created:** 2025-11-19T14:58:56.047Z
- **Changed:** 2026-01-09T11:38:14.56Z

### Repro Steps

Environment:  production 
 

 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see Mode ON 
• User logged in to Koppert One 
 
CASE 1
Steps: 
• Select Enterprise -> Kwekerij Tass on Prod 
• Look at week 46 
• Pay attention order
Conversation 1 -> https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1763549687388229
Conversation 2 -> https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1763626456845589 
  
Actual result: Order exists on order-page, is not in planner.
 

 
Expected result: Should be in Planner 

CASE 2Steps: 
• Select Enterprise -> The Koffee Shop 
• Look at week US1-SO00335698 in company  
• Pay attention orderConversation 2 -> https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1763626456845589 
  
Actual result: An order has orderline with quantity, but does not show up in 
Expected result: Should be in Planner 

CASE 3Steps:  
• Pay attention orderConversation 2 -> https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1763626456845589 
  
Actual result: An order has orderline with quantity, but does not show up in 
 
Expected result: Should be in Planner

---

## Bug #17818: Inf from Order reference field is not fully displayed

- **URL:** [17818](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17818)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** FE; Orders; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-21T12:17:27.877Z
- **Changed:** 2026-01-09T10:47:05.163Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order lists is opened - 
• User add a long message in Order Reference field 
 Steps: 
• Click on View details  
• Pay attention to the information in Order Reference field 
  
Actual result: Inf from Order reference field is not fully displayed 
Expected result: Order Reference field size should increase according to information in field (TBD)

---

## Bug #17674: Not the product's image is displayed in the 'Add product' modal

- **URL:** [17674](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17674)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** FE; PBI; Planner
- **AssignedTo:** Tiffany Levens
- **Created:** 2025-11-13T17:05:01.217Z
- **Changed:** 2026-01-09T10:06:07.06Z

### Repro Steps

STR:
• Open Planner 
• Click on the 'Add product'  
• Search for this product

 
• Check the image that is displayed 
 Actual result: The second image is displayed, not the product's image itself. If you open More info link, then the product's image is displayed there

https://www.koppert.com/horiver-rollertrap/

Expected result: the product's image is displayed in the 'Add product' modal

---

## Bug #15552: Previous value appears for a second after editing and saving

- **URL:** [15552](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15552)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Lag Buster; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-07-23T07:21:54.36Z
- **Changed:** 2026-01-08T09:38:13.177Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One  
• Entr has a few locations 
• Planner is opened 
 Steps: 
• Edit some order few times 
• Click Order button immediately when button becomes available 
• Pay attention to the Previous value (32 sec on video) 
  
Actual result: Previous value appears for a second after editing and saving 
 
 
Expected result: Previous value should NOT appear

---

## Bug #14840: Order is not saved due to token refresh on Orders List

- **URL:** [14840](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14840)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Ordering - list; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-06-11T11:37:42.817Z
- **Changed:** 2026-01-08T09:38:13.177Z

### Repro Steps

Environment: WEB 
 
Preconditions:• User logged in to Koppert One  
• User has a few locations 
• Orders list is opened in one tab  
• My profile is opened in second tab 
 
 Steps: 
• Click on +Create Order 
• Click on next to Add product link -> Select some product  
• Add some qty  
• Click on My profile in second tab  -> Change the language 
• Open Orders list in the first tab -> Create order button 
• Pay attention to the 'Order 
  
Actual result: Order is not saved due to token refresh on Orders List 
 
Expected result:  
 
• Order should be saved  
• Orders List should be opened

---

## Bug #14200: Double orders are created after fast editing

- **URL:** [14200](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14200)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Lag Buster; Order List; Planner
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-04-22T14:14:50.73Z
- **Changed:** 2026-01-08T09:38:13.177Z

### Repro Steps

Environment:  dev. 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened 
• User has an Enterprise with Locations 
  
Steps: 
• Enter some value for Product 1 
• Continue updating value very fast and Save 
• Pay attention to the Product 1  
   
Actual result:  
• Double orders are created after fast editing  
• Two orders are displayed in Order list  
  
 
Expected result:  
• Double orders should not be created after fast editing  
• Only one order for product 1 should be displayed in Order list (the product is updated only)

---

## Bug #14193: Order is displayed on Planner but does not exist in F&O after deleting order on Order details and updating on Planner

- **URL:** [14193](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14193)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Order List; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-04-22T08:22:59.04Z
- **Changed:** 2026-01-08T09:38:13.177Z

### Repro Steps

Environment:  dev. 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened 
• User has an Enterprise with Locations 
  
Steps: 
• Open Planner on one tab  
• Open Order details in another tab  
• Open any order on Order details -> Delete -> Save 
• Open Planner (Step 1) 
• Edit value for deleted order (Step 3) -> Save before conflict location modal appear 
• Go to F&O and Order details 
• Pay attention to the deleted order 
• Create a new one order for the same day but another product  
• Pay attention to the new order
 
   
 
Actual result:  
• Deleted order is still displayed on Planner 
• Deleted order is NOT displayed on Order list 
 
• Deleted order  does not exist in F&O 
• New order is not displayed  on Order list and F&O

 
  
Expected result: Order should NOT be displayed on Planner if it does not exist in F&O

---

## Bug #18511: Green border appears only after clicking after qty is added/edited

- **URL:** [18511](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18511)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-23T09:36:04.893Z
- **Changed:** 2026-01-07T12:53:56.777Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see Orders 
• User logged in to Koppert One 
• Orders pahe is displayed 
 Steps: 
• Click on Create order  
• Click on Add product link -> Select some product  
• Enter qty in input  
• Pay attention to the input border -> Dark border is displayed 
• Click anywhere -> Border becomes green  
• Click on Back arrow
CASE 2 
• Click on View details 
• Click on input  
• Change the qty 
• Pay attention to the input border  
• Click anywhere  
  
Actual result: Green border appears only after clicking after qty is added/edited 
Expected result:  Green border should be after adding/changing the qty, please look on mobile (Mobile video in attachments)

---

## Bug #17898: Visit Report can be created/edited on archived Location in case when qty entered and page doesn't refresh

- **URL:** [17898](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17898)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Visit report; Visit reports
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-26T12:48:56.64Z
- **Changed:** 2026-01-07T10:00:13.997Z

### Repro Steps

Environment:   dev 
 
Preconditions:• Swagger is opened -> https://api-dev.koppert.one/api/#/Jobs/syncLocations -> Jobs-> /api/v1/jobs/sync-locations 
• DB is opened -> psqldb-dev-westeurope-001 -> Databases -> psqldb-dev-westeurope-001Schemas -> public -> Locations  
• User has Admin + Allowed Country Advisor roles -> to see Mode On 
• User logged in to Koppert One 
• User has some Visit Report on Location 1  
• Location 1 is active -> 4Evergreen Steenbergen B.V. 
  
Steps: 
• Click on View details for VR from Preconditions -> Edit 
• Mark Location 1 as archived in DB -> Save 
• Go to Swagger -> Click on Execute 
• Refresh VR page 
• Expand locations drop-down 
• Pay attention to the archived location 
• Click on Back arrow 
• Pay attention to the archived location 
  
Actual result:  
• Empty row is displayed for Location after refreshing  
• Archived location is displayed in Locations drop-down as ID 
• Archived location is displayed in Locations drop-down after expanding 
•  
  
 
Expected result: TBD

---

## Bug #16074: [PROD]The orange timer line overlaps the next gray input line

- **URL:** [16074](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16074)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; PRD; Production; QualityAssurance; Web
- **Created:** 2025-08-28T07:54:53.127Z
- **Changed:** 2026-01-06T11:44:13.09Z

### Repro Steps

Environment: prod
Preconditions: 
 
 
 
 
• Kopppert.one is opened 
• Planner page is opened 
• Product with deadline timer is displayed -> ?day=19&hour=11&minute=54 
 Steps: 
• Pay attention to the lines 
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1756366229036769
 
 Actual result: The orange timer line overlaps the next gray input line  
 
Expected result: one line, and it should be orange orange lines should win from gray lines.

---

## Bug #17867: [PROD] Order emails sent for non existing order

- **URL:** [17867](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17867)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; PRD; Production; QualityAssurance; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-11-25T14:14:05.873Z
- **Changed:** 2026-01-06T09:13:18.78Z

### Repro Steps

Env: prod. 
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1764062642387859 
 
 
Steps to reproduce:  
• Link to user to Nature fresh Farms Strawberry 
• try to open https://www.koppert.one/apps/order/orders/US1-SO00337502 
 Actual result: link in order-confirmation-email doesn't open the order, because it doesn't exist.
  
Expected result: Email should not be sent for non existing order 
 
 
See attachments.

---

## Bug #18606: Wrong location sorting

- **URL:** [18606](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18606)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Planner; V; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-30T12:21:13.28Z
- **Changed:** 2026-01-06T08:47:08.35Z

### Repro Steps

Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is displayed  
 Steps: 
• Expand Locations drop-down  
• Pay attention to the Location sorting 
https://koppertplatform.slack.com/archives/C0464PF164W/p1763645056264349
 
  
Actual result: Wrong location sorting
 
Expected result: should be alphabetically

---

## Bug #18698: Green line is displayed when search result returns only one valid product

- **URL:** [18698](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18698)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Planner; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-05T11:17:28.327Z
- **Changed:** 2026-01-06T08:21:00.58Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
 Steps: 
• Open planner, select location with products 
• Add new 02680 product for couple locations and type quantity to this product for all locations 
• Try to search  &quot;02680&quot; or Aphipar 
  
Actual result: Green line is displayed for Aphipar product 
 
Expected result: Green horizontal line should NOT appear against the location(s) with unsaved changes to Aphipar as there is nothing to split by this line 

 

Scenario 4: User searches for a product for which unsaved changes exist across one or a few locations  Given unsaved changes exist only for Aphipar product 
When typing Aphipar into search field 
And search result returns only one Aphipar product  
Then a green horizontal line should NOT appear against the location(s) with unsaved changes to Aphipar as there is nothing to split by this line

---

## Bug #18694: Deadline timer is overlapped when nothing matches your search input

- **URL:** [18694](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18694)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Planner; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2026-01-05T08:17:51.913Z
- **Changed:** 2026-01-05T15:11:22.337Z

### Repro Steps

Environment:  dev 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
•  
 Steps: 
• Open planner, select location with products 
• Add new product and type quantity to this product 
• Try to search something that is not exist &quot;sdsfsaf&quot; 
  
Actual result: Deadline timer is overlapped when nothing matches your search input 
 
Expected result: Deadline timer should be fully visible

---

## Bug #18467: Prevent web backend to be broken because of authors

- **URL:** [18467](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18467)
- **State:** Done
- **Area:** Digital-Services
- **AssignedTo:** Ievgen Shemonaiev
- **Created:** 2025-12-20T08:46:51.45Z
- **Changed:** 2026-01-05T12:40:49.777Z

### Repro Steps

_(empty)_

---

## Bug #18657: Incorrect data is displayed on side effects after synk on prod

- **URL:** [18657](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18657)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; PRD; Production; QualityAssurance; Side Effect; Side Effects
- **AssignedTo:** Josiah Gayman
- **Created:** 2026-01-02T10:35:18.06Z
- **Changed:** 2026-01-05T12:34:45.12Z

### Repro Steps

Preconditions:
• User logged in to Koppert One 
• Knowledge -> Side Effects is displayed  
 
 
Actual result: Incorrect data is displayed on side effects after synk on prod -> 2 and 3 are displayed
 
Expected result: Data should be correct as on dev screen

---

## Bug #18585: Order details contains inf after deadline times is passed

- **URL:** [18585](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18585)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-29T10:33:33.96Z
- **Changed:** 2026-01-05T11:43:57.647Z

### Repro Steps

Environment: stage, dev 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Planner is displayed 
• Deadline timer is added -> ?day=29&hour=11&minute=29 
 Steps: 
• Enter some qty in input with deadline timer 
• Click on green order  
• Enter some reference and note 
• Click Save button  
• Don't close the order details modal  
• Pay attention to the inf in reference and note
 
  
Actual result: Order details contains inf after deadline times is passed 
Expected result: Order details should clear the inf from  reference and note AND Order details should be closed with order deadline modal

---

## Bug #18601: Tool-tip is not improved to a new design on different pages

- **URL:** [18601](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18601)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-30T10:50:25.65Z
- **Changed:** 2026-01-05T10:35:02.447Z

### Repro Steps

Environment:   dev 
 
CASE 1
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is displayed -> Mode ON  
 Steps: 
• Move cursor to Location  
• Pay attention to the Tooltip  
  
Actual result: Location tool-tip is not improved to a new design  
Expected result: Location tool-tip should be improved to a new design 
https://www.figma.com/design/0MOYjJmTGL4I9x770Z1sgw/Koppert-One-designs?node-id=11910-7665&t=DsuW59iRoE6X82xK-0

 
 
CASE 2Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Orders is displayed  
 Steps: 
• Click on Create order button 
• Expand Locations drop-down  
• Move cursor to Location  
• Pay attention to the Tooltip  
  
Actual result: Location tool-tip is not improved to a new design for simple ordering 
Expected result: Location tool-tip should be improved to a new design for simple ordering 
https://www.figma.com/design/0MOYjJmTGL4I9x770Z1sgw/Koppert-One-designs?node-id=11910-7665&t=DsuW59iRoE6X82xK-0 

 

 

 
 
CASE 3 
Preconditions:• Visits report is displayed  
 Steps: 
• Click on Create visit report button 
• Expand Locations drop-down  
• Move cursor to Location  
• Pay attention to the Tooltip  
  
Actual result: Location tool-tip is not improved to a new design for visit report creation  
Expected result: Location tool-tip should be improved to a new design  
 

 

 

 
 
CASE 4Preconditions:
• Visit reports is displayed  
  
Steps: 
• Click on Create visit report button 
• Expand Email drop-down  
• Move cursor to email 
• Pay attention to the Tooltip  
  
Actual result: Email tool-tip is not improved to a new design for Visit report creation 
Expected result: Location tool-tip should be improved to a new design  

 
 

CASE 5 
Preconditions:
• Visit reports is displayed  
  
Steps: 
• Click on Edit button for VR 
• Expand Locations drop-down  
• Move cursor to Location  
• Pay attention to the Tooltip  
  
Actual result: Location tool-tip is not improved to a new design for visit report creation  
 
Expected result: Location tool-tip should be improved to a new design  

 

 

 

 
 
CASE 6 
Preconditions:
• Organization is displayed  
  
Steps: 
• Click on Create team member  
• Expand Country drop-down  
• Move cursor to countries 
• Pay attention to the Tooltip  
  
Actual result: Country tool-tip is not improved to a new design for team member creation  
 
Expected result: Country tool-tip should be improved to a new design  
 

 
 
CASE 7 
Preconditions:• Organization is displayed  
  
Steps: 
• Click on Create team member  
• Expand Enterprise drop-down  
• Move cursor to Enterprise 
• Pay attention to the Tooltip  
  
Actual result: Enterprise tool-tip is not improved to a new design for team member creation  
 
Expected result: Enterprise tool-tip should be improved to a new design  
 

 

 
CASE 8 
Preconditions:• Organization is displayed  
  
Steps: 
• Click on View -> Edit 
• Expand Country drop-down  
• Move cursor to Country 
• Pay attention to the Tooltip  
  
Actual result: Country tool-tip is not improved to a new design for team member creation  
 
Expected result: Country tool-tip should be improved to a new design  

 

 

 
CASE 9 
Preconditions:• Admin is displayed -> Users 
  
Steps: 
• Click on + Create user 
• Expand Preferred language drop-down  
• Move cursor to language 
• Pay attention to the Tooltip  
• Expand Name drop-down for Sales Persons 
• Move cursor to name 
• Pay attention to the Tooltip 
  
Actual result: Tool-tips are not improved to a new design for team member creation  
 
 
Expected result: Tool-tip should be improved to a new design  

 

 
CASE 10 
Preconditions:• Admin is displayed -> Users 
  
Steps: 
• Click on user name -> Edit 
• Expand Preferred language drop-down  
• Move cursor to language 
• Pay attention to the Tooltip  
• Expand Name drop-down for Sales Persons 
• Move cursor to name 
• Pay attention to the Tooltip 
  
Actual result: Tool-tips are not improved to a new design for team member creation 

 
 
Expected result:  Tool-tips  should be improved to a new design  
 

 
 

 

 
CASE 11 
Preconditions:• Admin is displayed -> Enterprise 
  
Steps: 
• Click on enterprise name -> Settings -> Edit  
• Expand Price Visibility drop-down  
• Move cursor to e.g. yes  
• Pay attention to the Tooltip  
• Expand Order Reference drop-down  
• Move cursor to select some item  
• Pay attention to the Tooltip 
  
Actual result: Tool-tips are not improved to a new design for team member creation  
 
Expected result:  Tool-tips  should be improved to a new design  
 

 

 

 
CASE 12 
Preconditions:• Admin is displayed -> Subsidiaries 
  
Steps: 
• Click on Edit -> Settings 
• Expand Price Visibility drop-down  
• Move cursor to select some option  
• Pay attention to the Tooltip  
• Expand Order Reference drop-down  
• Move cursor to to select some option  
• Pay attention to the Tooltip 
  
Actual result: Tool-tips are not improved to a new design for team member creation  

 
 
Expected result:  Tool-tips  should be improved to a new design  
 

 

 

 
CASE 13 
Preconditions:• Admin is displayed -> Sсoutables 
  
Steps: 
• Click on +New Scoutable 
• Expand Category drop-down  
• Move cursor to select some option  
• Pay attention to the Tooltip 
NOTE: the same for Edit 
  
Actual result: Tool-tip is not improved to a new design for team member creation 
 
 
Expected result: Tool-tip should be improved to a new design  
 

CASE 14 
Preconditions:• Admin is displayed -> Shipping methods 
  
Steps: 
• Click on +Shipping method 
• Expand drop-downs
- Mode of delivery
- Subsidiary
 
- Calculation method  
• Move cursor to select some option  
• Pay attention to the Tooltip 
NOTE: the same for Edit 
  
Actual result: Tool-tips are not improved to a new design for team member creation 

 
 
Expected result: Tool-tips should be improved to a new design  
 

 
 
CASE 15 
Preconditions:• Admin is displayed -> Customer Assortments 
  
Steps: 
• Click on +Customer Assortments 
• Expand drop-down
 
• Move cursor to select some option  
• Pay attention to the Tooltip 
 
  
Actual result: Tool-tip is not improved to a new design for team member creation  
 
Expected result: Tool-tip should be improved to a new design  

 

 

 
CASE 16 
Preconditions:• My profile is displayed  
  
Steps: 
• Click on Info 
• Expand drop-downs:
- Country
- language
 
• Move cursor to some option 
• Pay attention to the Tooltips  
  
Actual result: Tool-tip are not improved to a new design  
 
 
 
 
 

 
 
 
 
Expected result: Tool-tips should be improved to a new design  

 

 

 
CASE 17 
Preconditions:• Log in is displayed  
  
Steps: 
• Click on Registration 
• Expand drop-downs:- Country- language 
• Move cursor to some option 
• Pay attention to the Tooltips  
  
Actual result: Tool-tip are not improved to a new design  
 
 
 
 
 
 
 
 
 
Expected result: Tool-tips should be improved to a new design

---

## Bug #18680: Email is non selectable text if try to select full email text

- **URL:** [18680](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18680)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; FE; PBI; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2026-01-02T13:10:28.613Z
- **Changed:** 2026-01-05T10:03:24.047Z

### Repro Steps

Environment: вум 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Admin is displayed -> Subsidiaries -> Local contact details 
 Steps: 
• Eneter or paste email in BCC e-mail address for order confirmations 
• Try to select all email address 
• Pay attention to the Email 
 
  
Actual result: Email is non selectable text if try to select full email text  
Expected result: Should be selectable text as for Support Email or Contact Email

---

## Bug #15441: Wrong styling of where to find company codes modal

- **URL:** [15441](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15441)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-07-18T10:11:35.74Z
- **Changed:** 2025-12-31T08:16:42.26Z

### Repro Steps

Environment: Dev/stage 
 
 
 
 
 
 
 
 
 
Preconditions:• User logged in to Koppert One dev/stage 
 Steps: 
• Open registration page 
• Select Already a customer = Yes 
• Click on Company code info icon 
  
Actual result: Wrong styling of modal

 
 
Expected result: Styling is by design

---

## Bug #18295: Visit report created with 500 error if attachment contains cyrillic symbols

- **URL:** [18295](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18295)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Visit report
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-12-10T12:15:43.61Z
- **Changed:** 2025-12-31T08:15:46.173Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has permission to create visit reports
 
 Steps: 
• Create visit report with attachment that contains specific name like: Знімок екрана 2025-12-09 о 12.30.10.jpeg 
  
Actual result: 500 error  - visit report created without attachment
 
Expected result: No error - visit report created with attachment

---

## Bug #18586: Shipping methods drop-down are not displayed on Planner/Simple orders

- **URL:** [18586](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18586)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-29T11:07:01.56Z
- **Changed:** 2025-12-29T14:17:47.347Z

### Repro Steps

Environment: dev 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Planner is displayed 
• There more than 2 available Shipping methods 
• Shipping methods are active on Shipping methods and Enterprise levels
 
• Planner is displayed 
 Steps: 
• Enter some qty  
• Click on Order box 
• Pay attention to the Shipping methods drop-down 
• Click on Order button  
• Click on Order box for order from step  4 
• Pay attention to the Shipping methods drop-down 
• Click on Orders -> + Create order button  
• Pay attention to the Shipping methods drop-down 
  
Actual result: Shipping methods drop-down are not displayed on Planner/Simple orders
 

 

 
Expected result: Shipping methods should be displayed on Planner/Simple orders

---

## Bug #12806: Some Location names differs in Planner and Orders

- **URL:** [12806](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/12806)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; bug_triage; Orders; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-01-29T09:35:29.49Z
- **Changed:** 2025-12-24T08:51:56.85Z

### Repro Steps

Environment: stage 

 
Preconditions: Bela for Nurseries enterprise is selected. 

 
Steps: 
• Open Planner and pay attention to the location names. 
• Open Orders page and pay attention to the location names. 
  
Actual result: 
One of the location names differs on Planner and in Orders page. 

 
On Orders it appears as &quot;Bela Flor Nurseries, Harrisonville&quot;: 

 

 
On Planner just &quot;Bela Flor Nurseries&quot;: 

 

 
In F&O we have the same location name as on Orders page: 

 

 
Expected result: 
Location names should be consistent.

---

## Bug #13397: Planner scroll desynchronizes  when switch to a different window

- **URL:** [13397](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13397)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-03-05T10:20:50.423Z
- **Changed:** 2025-12-24T08:43:27.35Z

### Repro Steps

Environment: dev 

 
Preconditions: 
• Two windows are opened. 
  
Steps: 
• Navigate to the Odrer module -> Planner page. 
• Scroll the weeks usinng touchpad. 
• Switch to another window. 
• Continue scrolling. 
  
Actual result: 
Planner scroll desynchronizes, the weeks continue to be changing, but the scroll stays the same (please check recoding in attachments). 

 
Expected result: 
Planner scroll should not desynchronize.

---

## Bug #18480: Double order is created instead of order removing

- **URL:** [18480](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18480)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Mobile; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-22T09:48:39.85Z
- **Changed:** 2025-12-23T11:20:25.347Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is displayed 
 Steps: 
• Click on input on WEB  
• Enter 5555 for Product 1 -> Save  
• Find the same order on Planner for mobile  
• Remove qty for Product 1-> Save 
• Try a few times steps 1-4 
• Pay attention to the order  
  
Actual result:  
• Double order is created instead of order removing  
• Cancelled order is displayed on double order pop-up 
  
Expected result:   
• Double order should NOT be created  
• Order should be removed 
• Cancelled order should NOT be displayed on double order pop-up

---

## Bug #18479: Order box continues displaying on Planner when order is removed

- **URL:** [18479](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18479)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Mobile; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-22T09:27:46.113Z
- **Changed:** 2025-12-23T11:20:25.347Z

### Repro Steps

Environment:  stage 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is displayed 
 Steps: 
• Click on input on WEB  
• Enter qty for Product 1 -> Save  
• Find the same order on Planner for mobile  
• Remove qty for Product 1-> Save 
• Pay attention to the order box on Planner for removing order 

4Evergreen Steenbergen B.V. Enterpr
NL6-SO00276507
 
  
Actual result: Order box continues displaying on Planner when order is removed

 
Expected result:  Order box should be removed as well  removed

---

## Bug #18456: 'Open' status is displayed after product cancellation on Order details for NL6-SO00276425

- **URL:** [18456](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18456)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Orders; Planner; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-18T12:18:32.753Z
- **Changed:** 2025-12-23T11:20:25.347Z

### Repro Steps

Environment:  stage 
 
 
 
 
 
• mob  v 3.2.0_OTA 2 
• web 
 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see Planner 
• User logged in to Koppert One 
• User has some order with only one Product (qty =2222)  on 29 december 2025 -> NL6-SO00276425  
• NL6-SO00276425 has order note
 
• F&O is opened for -> NL6-SO00276425 
• Planner is displayed
 
 Steps: 
• Go to Planner 
• Enter 0 instead of 2222 -> Click on Order button 
• Open Orders list  
• Click on View details for Order from Step 2 
• Pay attention to the Edit button and order status
NOTE: the same for US1-SO00331979 
  
Actual result:  
• Open status is displayed after product cancellation on Order details (Cancelled is displayed on Orders list and Order log) 
• Edit button is active 
• Order note is not displayed on Orders list

 
  

 

 

Expected result:  
• Cancelled status should be displayed after product cancellation on Order details (as on Orders list) 
• Edit button should be disabled 
• Order note should be displayed on orders list

---

## Bug #18320: Page reloads and the same order is displayed in order details after changing Enterprise

- **URL:** [18320](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18320)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-11T10:18:13.367Z
- **Changed:** 2025-12-23T11:20:25.347Z

### Repro Steps

Environment: dev 
 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• User has linked Enterprises 
• Orders list is displayed 
• Order emails notifications is turn ON  
 Steps: 
• Click on any +Create order button  
• Create some order -> Save  
• Go to email  
• Click on View on email about order creation -> Order details is displayed 
• Change the Enterprise 
• Pay attention to the order 
• Change the Enterprise a few times 
• Pay attention to the order 
  
Actual result:  
• Order details continue displaying for order that not related to selected Entr 
• Page reloads

 
  
Expected result:  
• Orders list should be displayed  
• Order not found message should be appear (TBD -> I didn't find ind about text)

---

## Bug #18361: Tooltip text is not visible for pages

- **URL:** [18361](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18361)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-15T08:59:01.67Z
- **Changed:** 2025-12-23T11:05:19.2Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Order section is displayed 
 Steps: 
• Move cursor to name pages -> e.g. Planner/Order 
• Pay attention to the Tooltip text 
  
Actual result: Tooltip text is not visible for pages
 
Expected result: Tooltip text should be default

---

## Bug #18359: Support section is displayed partially when user has no linked enterprises

- **URL:** [18359](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18359)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** PBI; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-12-15T08:18:13.343Z
- **Changed:** 2025-12-23T11:05:19.2Z

### Repro Steps

STR: 
• Login as a user without linked enterprises 
• Check homepage 
 Actual result: Need help ? - section is displayed 
Expected result: When there are no linked to user enterprises - Need help ? section should not be displayed

---

## Bug #18305: Leave guards don't appear during closing tab/browser when inf is entered in Cultivar tab but not to save

- **URL:** [18305](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18305)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Visit report; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-10T16:00:03.35Z
- **Changed:** 2025-12-23T11:05:19.2Z

### Repro Steps

Environment: dev 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• User has linked Enterprises 
• Visit reports list is displayed 
 Steps: 
• Click on +Visit report button  
• Click on +Cultivar 
• Enter some text -> Don't click on tick  
• Click on another page/module/section  
• Pay attention to the Leave guard 
• Click on +Visit report button 
 
• Click on +Cultivar 
• Enter some text -> Don't click on tick  
• Click on cross icon to close the tab/click on cross icon to close the browser 
• Pay attention to the Browser leave guard 
  
Actual result: Leave guards don't appear after Location selection and close tab/browser 
Expected result: Should appear

---

## Bug #18296: The errors appear when changing view type in Customer Assortments

- **URL:** [18296](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18296)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Admin; BE; PBI
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-12-10T12:22:31.017Z
- **Changed:** 2025-12-23T11:05:19.2Z

### Repro Steps

STR:

• Open Admin page -> Customer Assortments 
• Change view type for any subsidiary 
• Click on the Save button 
 Actual result: errors appear, the view type is not changed

 

Expected result: no errors, view type is changed

---

## Bug #18294: Leave guards don't appear after Location selection and close tab/browser

- **URL:** [18294](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18294)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Visit report; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-10T10:50:22.877Z
- **Changed:** 2025-12-23T11:05:19.2Z

### Repro Steps

Environment: dev 
 
 
 
 
Preconditions:• Koppert.One is opened 
• User has linked Enterprises 
• Orders list is displayed 
 Steps: 
• Click on any +Create order button  
• Select any location  
• Click on another page/module/section  
• Pay attention to the Leave guard 
• Click on any +Create order button  
• Select any location  
• Click on cross icon to close the tab/click on cross icon to close the browser 
• Pay attention to the Browser leave guard 
  
Actual result: Leave guards don't appear after Location selection and close tab/browser 
Expected result: Should appear (TBD) Please, look at the video VR

---

## Bug #17521: Unhandled toast message appears when Orders list = 500 and redirecting from Planner

- **URL:** [17521](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17521)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Order List; Orders; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-06T12:15:55.17Z
- **Changed:** 2025-12-23T11:05:19.2Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Orders list = 500 
• Planner is displayed 
• User has order with Product 1 Product 2 
 Steps: 
• Click on order box 
• Click on View details link 
• Pay attention to the toast message 
  
Actual result: Unhandled toast message appears when Orders list = 500 and redirecting from Planner

 
 
Expected result: Toast message should be: &quot;Something went wrong. Please try again later.&quot;

---

## Bug #15070: Order that was just created is not displayed in Orders List

- **URL:** [15070](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15070)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Order List; PBI; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-06-18T13:14:58.343Z
- **Changed:** 2025-12-23T11:05:19.2Z

### Repro Steps

Environment: stage 
 
 
 
 
 
Preconditions:• User logged in to Koppert One  
• User has a few locations 
• Order list is opened 
• 
 
 Steps: 
• Click on +Create Order button 
• Select day on next month 
• Add some product/qty -> Save 
• Pay attention to the Orders List 
  
Actual result: Order that was just created is not displayed din Orders List and appears after refreshing 
Expected result: Order should appears in Orders List already after creation

---

## Bug #17208: Order box continues displaying for order that is not saved when deadline timer has been passed

- **URL:** [17208](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17208)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-17T07:56:44.573Z
- **Changed:** 2025-12-23T10:22:06.377Z

### Repro Steps

Environment: stage 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened 
 Steps: 
• Set the deadline timer 
• Enter qty for new order 
• Click on green order box  
• Select shipping method + add reference + add note -> Save 
• Wait until the deadline timer expires 
• Pay attention order box 
  
Actual result: Order box continues displaying for order that is not saved when deadline timer has been passed 
Expected result: Order box should disappear with unsaved qty

---

## Bug #13054: Scrollbar icon disappears from the dropdowns

- **URL:** [13054](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13054)
- **State:** Resolved
- **Area:** Digital-Services
- **Tags:** Admin; My_Profile; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-02-13T08:33:40.833Z
- **Changed:** 2025-12-17T13:36:17.703Z

### Repro Steps

Environment: dev 
 
 
Preconditions: 
• User is logged in to Kopper  
 Steps: 
• Click on My Profile 
• Expand e.g. Country dropdown/Language 
• Scroll up/down 
• Pay attention to scrollbar icon (please, look at the video)

 
 Actual result: Scrollbar icon disappears  

 
Expected result: Scrollbar icon should NOT disappear

---

## Bug #13369: Password field appears for a sec when login as SSO after changing language

- **URL:** [13369](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13369)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Login; Reproduce on Mobile; SSO
- **Created:** 2025-03-03T13:37:13.053Z
- **Changed:** 2025-12-17T13:31:03.45Z

### Repro Steps

Environment: all envs 

 
 
Steps: 
• Enter email for SSO -> @koppert.nl 
• Change tha Language 
• Pay attention to Login field 
  
Actual result: Password field appears for a sec 

 
Expected result: Password field should NOT appear

---

## Bug #18439: The second shipping method is displayed instead of the fourth selected one

- **URL:** [18439](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18439)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Ivan Dutka
- **Created:** 2025-12-17T11:07:10.117Z
- **Changed:** 2025-12-17T13:21:00.71Z

### Repro Steps

Environment:  stage 
Build: v.3.2.0 
 
 
Preconditions:• User open in to Koppert One 
• User has access to Planner -> Mode ON 
• User has 4 shipping methods 
 Steps: 
• Click on order box -> NL0050 is display ed 
• Select the last shipping method ->  the fourth -> nl 
• Pay attention to the selected shipping method 
  
Actual result: The second shipping method is displayed instead of the fourth selected one 
Expected result: Should be selected shipping method

---

## Bug #14298: Orders are doubled in case when ordering during deadline timer finishes

- **URL:** [14298](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14298)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Lag Buster; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-04-28T12:28:02.373Z
- **Changed:** 2025-12-17T13:16:30.623Z

### Repro Steps

Environment:  dev. 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened  
• Product 1 has deadline timer 
 Steps: 
• Enter some qty in Product 1 with deadline timer on Client 1 
• Click on the Order when 5 sec lefts to the end on deadline timer 
• Pay attention to the order  
  
Actual result: Orders are doubled in case when ordering during deadline timer finishes 
• 222 is displayed on 29.04 
• 222 is displayed on 30.04 
• double orders are created on 30.04 
  
 
Expected result: Orders should not be doubled in case when ordering during

---

## Bug #18437: Browser leave guard doesn't appear when changing URL on Safari

- **URL:** [18437](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18437)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; PBI; Planner; Visit report; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-16T13:00:31.107Z
- **Changed:** 2025-12-17T13:12:27.7Z

### Repro Steps

Environment: dev, Safari  
 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• User has linked Enterprises 
• Planner is displayed 
 Steps: 
• Change qty 
• Change URL  
• Click Enter  
• Pay attention to the Leave guard
NOTE: the same for order creation, editing, visit report creation and editing  
  
Actual result: Browser leave guard doesn't appear when changing URL on Safari  
Expected result: Should appear

---

## Bug #17756: Location is displayed as unchecked in Locations drop-down after it was unarchived

- **URL:** [17756](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17756)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-21T11:34:22.703Z
- **Changed:** 2025-12-17T13:11:14.433Z

### Repro Steps

Environment:   dev 
 
Preconditions:• Swagger is opened -> https://api-dev.koppert.one/api/#/Jobs/syncLocations -> Jobs-> /api/v1/jobs/sync-locations 
• DB is opened -> psqldb-dev-westeurope-001 -> Databases -> psqldb-dev-westeurope-001Schemas -> public -> Locations  
• User has Admin + Allowed Country Advisor roles -> to see Mode On 
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• Location 1 is archived 
 Steps: 
• Mark Location 1 as UNarchived in DB -> Save 
• Go to Swagger -> Click on Execute 
• Refresh the Planner 
• Expand Locations drop-down 
• Pay attention to the Location 1
NOTE: the same on Visits Reports 
  
Actual result: Location 1 is displayed as unchecked in Locations drop-down after it was unarchived 
 
Expected result: Select all should be checked by default (TBD)

---

## Bug #14209: FO doesn't respond due to a lot of request after orders creation for non-delivery days

- **URL:** [14209](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14209)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Lag Buster; Planner
- **Created:** 2025-04-23T12:08:32.393Z
- **Changed:** 2025-12-17T07:56:36.593Z

### Repro Steps

Environment:  dev. 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• User has an Enterprise with Locations 
• There some non-delivery days 
• Planner is opened for Client 1
 
  
Steps: 
• Enter some qty for a few products (5-6) for non-delivery days (Sat) 
• Click on Order button 
• Repeat Step 1 very fast again  
• Refresh Planner on Client 2 
• Create some order  
• Go to Planner for  Client 1  
• Pay attention to the orders that have been made on Sat 
• Pay attention to Order Details 
   
Actual result: FO doesn't respond due to a lot of request after orders creation for non-delivery days 
• Conflict Location modal doesn't appear 
• Orders are not moved to next available for delivery day (Mon) 
• 504 is displayed on Order List  
  
 
Expected result:  

• Conflict Location modal should appear 
• Orders should be moved to next available for delivery day (Mon) 
• Order List should be displayed  
•

---

## Bug #9108: Enterprise selector does not unfold when click on arrow

- **URL:** [9108](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/9108)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Enterprise
- **Created:** 2024-02-15T08:07:23.13Z
- **Changed:** 2025-12-17T07:51:14.93Z

### Repro Steps

Precondition:  
• Log in to Koppert One with several linked enterprises  
• &quot;Home&quot; page is opened  
 Steps to reproduce 
• Click on arrow on enterprise selector  
 Expected result: user can open/close enterprise selector by clicking on arrow as well as on whole field  

 
Actual result: enterprise selector is not open/close when click on arrow  (See attachments)

---

## Bug #14252: Datepicker is closed after Conflict Location modal appearing

- **URL:** [14252](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14252)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Lag Buster; Planner; Web
- **AssignedTo:** Ivan Kornyk
- **Created:** 2025-04-28T09:30:47.217Z
- **Changed:** 2025-12-17T07:49:12.253Z

### Repro Steps

Environment:  dev. 
 
Preconditions:• User has Admin -> to see Planner 
• User logged in to Koppert One  
• Planner is opened  
 Steps: 
• Enter some qty on Location 1  
• Click to Data picker  
• Change something on Location 1 from Client 2 -> Save 
• Wait Conflict location modal on Client 1 
• Pay attention to the data picker 
  
Actual result: Datepicker is closed after Conflict Location modal appearing  
 
Expected result:  Datepicker should not be closed after Conflict Location modal appearing (TBD)

---

## Bug #2220: Space count as value so user can create "Enterprise" with 'empty' fields

- **URL:** [2220](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/2220)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Bug; Enterprise; User
- **Created:** 2022-12-14T13:02:53.027Z
- **Changed:** 2025-12-17T07:48:50.817Z

### Repro Steps

Precondition:  
• log in as Admin  
• Open &quot;Enterprise&quot; page  
 Steps to reproduce  
• Click on &quot;+ New enterprise&quot; 
• Enter only space in required fields  
• Click on &quot;Create enterprise&quot; 
 Expected result: user cannot create enterprise with only space in fields  

 
Actual result:  Space count as value so user can create &quot;Enterprise&quot; with 'empty' fields (See attachments)
 

 
Postcondition: same bug when create/edit &quot;User name&quot; on &quot;Users&quot; page

---

## Bug #13915: Locations with building complement are duplicated

- **URL:** [13915](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13915)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Blocked by F&O; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-04-04T08:17:51.317Z
- **Changed:** 2025-12-16T08:43:06.64Z

### Repro Steps

Environment: dev 

 
Preconditions: 
• Building Complement has been added for 2 locations with the same names in F&O or to 1 of the locations with the same names (you can check on Green 2 Grow enterprise): 
  

• Open Planner after synchronization with F&O happened.
 
  
Steps: 
• Pay attention to the Locations List in Planner. 
  

 
Actual result: 
Locations with with Building Complement added got duplicated. 

 
Expected result: 
Locations shouldn't be duplicated.

---

## Bug #16695: Drop-downs blinks on Planner

- **URL:** [16695](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16695)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-09-24T13:47:25.73Z
- **Changed:** 2025-12-15T10:49:29.81Z

### Repro Steps

Environment:  Android, dev 
Build: v.2.5.16 ona 2 
Samsung Galaxy A35 5G, SM-A356B/DS, 14 version

 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On 
 Steps: 
• Expand weeks/locations drop-down 
• Hide the app 
• Open again 
• Pay attention to the locations list 
  
Actual result: Drop-downs blinks on Planner 
Expected result: Drop-downs should not blink on Planner

---

## Bug #18289: Сhanges are not discarded, user is not returned to Orders page after modal appearing about passed deadline

- **URL:** [18289](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18289)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-09T15:44:22.003Z
- **Changed:** 2025-12-12T14:14:26.18Z

### Repro Steps

STR:

• Set up deadline timer 
• Open Order create screen
 
• Add some product -> add quantity 
• Do not save 
• Wait until deadline is passed 
• Check the modal -> close it 
 Actual result: changes are not discarded, data is not cleared, user is not returned to Orders screen

 
Expected result: changes should be discarded, and user is returned to orders page after modal is closed
According to Scenario 8 from AC

---

## Bug #18200: Order-list can not be opened for Koppert Cress B.V. - NL6-33200 due to order without status

- **URL:** [18200](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18200)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; PRD; Production; QualityAssurance; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-08T11:52:08.083Z
- **Changed:** 2025-12-12T13:21:22.047Z

### Repro Steps

Environment:   dev 
 
Preconditions:
• User has Admin + Allowed Country Advisor roles -> to see Mode On 
• User logged in to Koppert One 
• Orders list is opened  
 Steps: 
• Link yourself to enterprise Koppert Cress B.V. - NL6-33200 
• Try to open Orders list page 
• Retreat feeling defeated 
• https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1765190308696969 
  
Actual result: Order-list can not be opened for Koppert Cress B.V. - NL6-33200 due to order without status 
 
Expected result: Order list should be displayed (TBD) -> solution in channel

---

## Bug #13548: Order details box disappears without saving order details

- **URL:** [13548](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13548)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-03-13T16:48:40.42Z
- **Changed:** 2025-12-12T13:18:20.88Z

### Repro Steps

Environment: all envs, but reproduces from time to time 

 
Steps: 
• Navigate to Order module -> Planner page. 
• Enter some value into input field. 
• Click on the &quot;Order&quot; button. 
• During pending order submission, open &quot;Order Details&quot; and add order reference.  
• Click &quot;Save&quot; in order details before order is confirmed. 
  
Actual result: 
Order box disappears without saving order details from time to time (please, check the recording in attachments). 

 
Expected result: 
Order box should not disappear. 

 
Link to the conversation in Slack about this issue: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1741873792615129

---

## Bug #15724: [Planner] [PRD] Order-deadlines are not syncing for some users

- **URL:** [15724](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15724)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; QualityAssurance; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-08-08T12:58:35.67Z
- **Changed:** 2025-12-12T10:05:30.513Z

### Repro Steps

Environment: PROD
 

Steps:
• Open Planner before the order deadline is passed for NL6 customers 
• Check the possibility of placing orders for different users
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1754648619250049

Actual result:
 
 Some NL6 enterprises can still place orders for upcoming Monday (screenshot1).Some NL6 customers can not place orders for Monday (screenshot2)

Expected result: The sync should work properly for all users

---

## Bug #18195: Leave guard doesn't appear if change the date and leave the screen

- **URL:** [18195](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18195)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Order List; Ordering
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-08T11:07:52.97Z
- **Changed:** 2025-12-11T10:39:44.293Z

### Repro Steps

STR:

 
• Open Orders -> tap on the 'Create Order' button 
• Change the shipping date 
• Leave the screen 
 Actual result: leave guard doesn't appear

Expected result: leave guard appears when attempting to leave the screen

---

## Bug #18213: The 'Discard changes' button doesn't change to 'Cancel' button after deleting data

- **URL:** [18213](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18213)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-08T14:34:01.87Z
- **Changed:** 2025-12-11T10:35:54.277Z

### Repro Steps

STR:

• Open Orders -> Create order 
• Type any data in the 'Order notes' field 
• Delete data from the field 
• Check the state of the button 
 Actual result: The 'Discard changes' button is displayed
Expected result: The 'Discard changes' button changes to the 'Cancel' button after deleting data

---

## Bug #18196: Leave guard doesn't appear when swiping to the right on iPhone

- **URL:** [18196](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18196)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-08T11:21:07.373Z
- **Changed:** 2025-12-11T10:34:45.27Z

### Repro Steps

STR: 
• Open Orders -> tap on the 'Create Order' button 
• Fill in some fields 
• Swipe to the right 
 Actual result: leave guard doesn't appear
Expected result: swiping is disabled

---

## Bug #18191: Incorrect placement of the 'Shipping method' field

- **URL:** [18191](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18191)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-08T10:45:32.623Z
- **Changed:** 2025-12-11T10:25:22.407Z

### Repro Steps

Actual result: The 'Shipping method' field is placed under Order reference

Expected result:

---

## Bug #16075: Order can be created for blocked Enterprise after adding blocked Entrp firstly on Admin

- **URL:** [16075](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16075)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Mobile; Planner
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-08-28T08:56:55.73Z
- **Changed:** 2025-12-10T15:54:07.54Z

### Repro Steps

Environment: dev, v2.5.3 
 
Preconditions:• Koppert.One is opened 
• Planner is opened on -> Mode ON 
 Steps: 
• Add blocked Enterprise to user on Admin -> user should't have cash  
• Click on More on mobile 
• Select blocked Enterprise -> 4Evergreen Annaland B.V. 
• Click on Planner 
• Create and save Order  
• Pay attention to the Enterprise
NOTE: there can be some additional steps that were missed, hart to reproduced. Screen with proof attached 
  
Actual result: Order can be created for blocked Enterprise after adding blocked Entrp firstly on Admin

 
 
Expected result: Order should NOT be created for blocked Enterprise

---

## Bug #13275: Login screen changes to resetting screen after changing the language

- **URL:** [13275](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13275)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Login; Mobile; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-02-26T08:01:52.74Z
- **Changed:** 2025-12-10T15:54:07.54Z

### Repro Steps

Environment: 2.2.4 stage 
 
 
Preconditions:• Kopppert.one is opened 
 Steps: 
• Click on Forgot password 
• Enet valid email 
• Click on Send reset link button 
• Change Language 
• Pay attention screen 
  
Actual result: Login screen changes to resetting screen after changing the language
 
 
Expected result: Login screen should NOT change to resetting screen after changing the language

---

## Bug #18292: Incorrect shipping date is automatically set up, however the correct date is available in calendar

- **URL:** [18292](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18292)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-12-10T10:08:45.777Z
- **Changed:** 2025-12-10T13:55:27.153Z

### Repro Steps

STR:
• Open 'Create order' screen 
• Check the shipping date for 'AppHarvest' location 
 
Actual result: 12.11.2025 is automatically set up

Expected result: 12.10.2025 is set up

---

## Bug #18180: NSO is displayed on Double order pop-up when F&O = 500

- **URL:** [18180](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18180)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** FE; Mobile; Ordering - mobile; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-05T14:24:11.047Z
- **Changed:** 2025-12-08T08:13:02.69Z

### Repro Steps

Environment: dev, v3.1.2 
 
Preconditions:• Koppert.One is opened on mobile 
• Koppert.One is opened on WEB
 
• Planner is opened on -> Mode ON 
• F&O = 500
 
 Steps: 
• There is some order on Location 1 on 28/01  
• Open Orders on WEB-> +Create order  
• Select Location 1 and 28/01 -> Create order -> Save 
• Click on Planner on WEB  
• Click on Planner on mobile 
• Click on Order box for Order from step 1 
• Pay attention to the NSO 
 
  
Actual result: NSO is displayed on Double order pop-up when F&O = 500 
 
Expected result: NSO is displayed on Double order pop-up when F&O = 500

---

## Bug #18013: Removed qty appears again after fast editing on Order Details

- **URL:** [18013](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18013)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Orders; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-28T16:10:26.527Z
- **Changed:** 2025-12-03T10:42:17.083Z

### Repro Steps

Environment: stage 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders list is displayed 
• User has order with 3 Products 
•  
 Steps: 
• Click on any View details -> Edit 
• Remove qty and add new very fast 
• Pay attention to the removed qty 
  
Actual result: Removed qty appears again after fast editing on Order Details  
Expected result: Removed qty should NOT appear again after fast editing on Order Details

---

## Bug #18011: Location selector in the Planner doesn't persist last selected location(s)

- **URL:** [18011](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18011)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Planner; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-28T15:26:50.643Z
- **Changed:** 2025-12-03T10:16:28.577Z

### Repro Steps

Environment: stage 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Planner is displayed 
• User has linked Enterprises with locations 
 Steps: 
• Expand Locations drop-down 
• Uncheck Select All 
- refreshing a page
- navigating between pages 
- logging in/logging out 
- switching enterprise
 
• Pay attention to the  locations 
  
Actual result: Location selector in the Planner doesn't persist last selected location(s) 
Expected result: Location selector in the Planner should persist last selected location(s)
https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14051

---

## Bug #18010: Edit button continues displaying as active for second and Cancelled order can be edited after cancellation

- **URL:** [18010](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18010)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-28T15:16:12.037Z
- **Changed:** 2025-12-03T10:15:48.94Z

### Repro Steps

Environment: stage 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders list is displayed 
• User has some order with one Product 
 Steps: 
• Click on any View details 
• Delete product  
• Click on Save 
• Pay attention to the Edit 
NOTE: the same during redirection from Planner 
  
Actual result: Edit button continues displaying as active for second and Cancelled order can be edited after cancellation 
Expected result: Edit button should be disabled when product is removing

---

## Bug #18056: Amount is not updated in Orders List after qty editing on Details and get back to Orders list

- **URL:** [18056](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18056)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Orders; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-01T15:36:40.16Z
- **Changed:** 2025-12-02T13:06:06.263Z

### Repro Steps

Environment: stage 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders list is displayed 
• User has linked Enterprises with some order  
• Product in Order contains
- currency 
- price 
•  
 Steps: 
• Click on View details -> Edit  
• Change the qty -> Save 
• Click on Back arrow (When N/A is displayed for Amount) 
• Pay attention to the amount  
  
Actual result: 'Amount is not updated in Orders List after qty editing on Details and get back to Orders list  
Expected result: The newest should be displayed

---

## Bug #18051: 0 can be entered for a new product during the order editing on Order details

- **URL:** [18051](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18051)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** FE; Orders; Regression; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-01T14:01:37.517Z
- **Changed:** 2025-12-02T12:43:33.473Z

### Repro Steps

Environment: stage 
 
 
 
 
Preconditions:• Koppert.One is opened 
• User has linked Enterprises with some order
Product 1
Product 2
Product 3 
• Order details is displayed 
 
 Steps: 
• Click on any Edit  
• Delete Product 1 
• Click on Add product link 
• Select Product 1 -> Add 
• Enter 0 in input for Product 1 
• Pay attention to the input 
  
Actual result: 0 can be entered for a new product during the order editing on Order details 
Expected result: 0 can NOT be entered for a new product during the order editing on Order details

---

## Bug #18047: Scheduled order is not displayed on orders list

- **URL:** [18047](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18047)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** BE; Order List; Regression
- **AssignedTo:** Bohdan Pavlenko
- **Created:** 2025-12-01T10:59:44.37Z
- **Changed:** 2025-12-02T12:10:28.52Z

### Repro Steps

Environment: stage 
 
 
 
 
Preconditions:• Koppert.One is opened
 
• Agrifiem NVE BV is selected 
• Orders list is displayed 
 Steps: 
• Search for NL6-SO00276324 in the response 
• Open Planner and search for NL6-SO00276324 again 
  
Actual result: Scheduled order is not displayed on orders list but exist on planner 

Expected result: Scheduled order should be displayed on orders list

---

## Bug #18062: Deliver reminder shows incorrect qty after decreasing lines one by one

- **URL:** [18062](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18062)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Orders; Planner; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-12-02T08:50:54.023Z
- **Changed:** 2025-12-02T11:49:11.313Z

### Repro Steps

Environment: stage 
 
 
 
 
 
 
 
 
Preconditions:• Koppert.One is opened 
• Orders list is displayed 
• Planner is displayed 
• User has some order with 
Product 1 - 500
Product 2 - 600 -> NL6-SO00276353 
 Steps: 
• Decrease qty on Planner -> Product 1 = 499 -> Save 
• Decrease qty on Planner -> Product 2 = 599 -> Save 
 
• Click on Order box for NL6-SO00276353 
• Click on View details -> Edit  
• Decrease qty -> Product 1 = 498 -> Save
 
• Decrease qty -> Product 2 = 598 -> Save
 
• Decrease qty -> Product 2 = 597 -> Save 
• 
 
• Go to F&O -> Open current order -> NL6-SO00276353 
• Pay attention to the Deliver reminder 
  
Actual result:  
• Deliver reminder shows incorrect qty after decreasing lines one by one 
• 500 and 600 instead of 597 and 498

 
  
Expected result:  
• Deliver reminder should show correct qty after decreasing lines one by one 
• 597 and 498 should be displayed

---

## Bug #17865: [PROD] Wrong translations for French language

- **URL:** [17865](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17865)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; QualityAssurance; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-11-25T14:00:15.07Z
- **Changed:** 2025-12-02T08:29:14.827Z

### Repro Steps

Env: prod.
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1764075791762439
 

 
 
Steps to reproduce:  
• Go to Profile 
• Select French language 
 Actual result: See Hungarian translations (On WEB PROD)
 
 
 
Expected result: French language is displayed 
 
 
See attachments.

---

## Bug #18009: Product's images are not displayed in the Product's details/Add product modal

- **URL:** [18009](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/18009)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; Regression; Web
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-28T14:59:23.9Z
- **Changed:** 2025-12-01T15:11:59.663Z

### Repro Steps

STR:
 

• Open Planner 
• Check Product's details 
• Check 'Add product' modal 
 Actual result: no images, just placeholders 

Expected result: images are displayed instead of placeholders

---

## Bug #17755: Order on archived location is displayed on Orders List

- **URL:** [17755](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17755)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Orders; PBI; Web
- **AssignedTo:** Tiffany Levens
- **Created:** 2025-11-21T10:58:14.257Z
- **Changed:** 2025-11-28T12:57:02.767Z

### Repro Steps

Environment:   dev 
 
Preconditions:• Swagger is opened -> https://api-dev.koppert.one/api/#/Jobs/syncLocations -> Jobs 
-> /api/v1/jobs/sync-locations

 
• DB is opened -> psqldb-dev-westeurope-001 -> Databases -> psqldb-dev-westeurope-001 
Schemas -> public -> Locations 
 
• User has Admin + Allowed Country Advisor roles -> to see Mode On 
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• Orders list is opened  
• User has some order on Location 1 -> NL6-SO00252141 
 Steps: 
• Mark Location 1 as archived in DB -> Save 
• Go to Swagger -> Click on Execute 
• Pay attention to the order on for archived location 
• Click on View details for order on for archived location 
  
Actual result:  
• Order on archived location is displayed on Orders List 
 
• Empty row is displayed for Order on archived location on Orders List  
• Order on archived location can be edited on Order details
 
  

 

 

 
Expected result: Order on archived location should not be shown

---

## Bug #13307: Updating order with multiple order lines of the same product doesn't work correctly

- **URL:** [13307](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/13307)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** FE; Orders; Planner; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-02-27T08:31:24.367Z
- **Changed:** 2025-11-28T08:32:33.653Z

### Repro Steps

Environment: stage 

 
Preconditions: 
• There is an order with multiple order lines of the same product (e.g. enterprise Agrifirm NWE B.V., order number NL6-SO00239715, date 24-03) 
  
Steps: 
 Updating via Orders: 
• Navigate to the Order module -> Orders tab. 
• Find mentioned in preconditions order. 
• Update SWIRSKI-MITE product in all exiting lines. 
  
Actual result: 
Additional Order line with this product with value &quot;0&quot; is added to the list (please, check the recoding in attachments). 

 
Expected result: 
No additional order line should be added. 

 
 Updating via Planner: 
• Navigate to the Order module -> Planner. 
• Find mentioned in preconditions order. 
• Update SWIRSKI-MITE product. 
• Navigate to the Orders tab and check the order details. 
 Actual result: 
All order lines are cleared and the new one is created with new value (please, check the recoding in attachments). 

 
Expected result: 
Existing order lines of the product should be kept.

---

## Bug #17864: Location marks as archived when erp_key and  erp_location_id the same in DB and  F&O

- **URL:** [17864](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17864)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; PBI; Planner
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-25T11:15:59.887Z
- **Changed:** 2025-11-27T08:48:49.08Z

### Repro Steps

Environment:   dev 
 
Preconditions:• Swagger is opened -> https://api-dev.koppert.one/api/#/Jobs/syncLocations -> Jobs-> /api/v1/jobs/sync-locations 
• DB is opened -> psqldb-dev-westeurope-001 -> Databases -> psqldb-dev-westeurope-001Schemas -> public -> Locations  
• User has Admin + Allowed Country Advisor roles -> to see Mode On 
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• ERP key for Location 1 = 00000
 
 Steps: 
• Change ERP key (e.g. 00001) in DB for Location 1 -> Save   
• Go to Swagger -> Click on Execute 
• Refresh the DB
a)-> Location 1 with ERP key = 00001 is marked as archived
b)-> A new record appears for Location 1 with ERP Key = 00000 is marked as unarchived
 
• Change ERP key 00001 to 00000   
• Uncheck archived mark  
• Mark the newest record to archived (from step 3 b) -> Save 
• Go to Swagger -> Click on Execute 
• Refresh the DB 
• Pay attention to the Location 1 with ERP key for Location 1 = 00000
 
  
Actual result: Location marks as archived when erp_key and  erp_location_id the same in DB and  F&O 
 
Expected result: Location should NOT mark as archived when erp_key and  erp_location_id the same in DB and  F&O

---

## Bug #16711: Keyboard issues

- **URL:** [16711](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/16711)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **Created:** 2025-09-25T09:50:57.71Z
- **Changed:** 2025-11-26T14:18:57.19Z

### Repro Steps

Environment: stage,  v3.0.0_OTA_3 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON on iOS and AndroidSteps: 
  
• Click on Add product  
• Enter some inf in Search -> keyboard appears 
• Hide and open app 
• Pay attention to the keyboard 
  
Actual result: 
•  Keyboard disappears for a second on iOS 
•  Keyboard closes on Android
 
  
 
Expected result: Keyboard should display

---

## Bug #15847: Order note category selected and list have different font sizes

- **URL:** [15847](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15847)
- **State:** Removed
- **Area:** Digital-Services
- **AssignedTo:** Tom Vroegop
- **Created:** 2025-08-14T12:32:26.947Z
- **Changed:** 2025-11-26T13:56:00.98Z

### Repro Steps

See attachments

---

## Bug #17525: [Prod] Emails contains English text for Dutch

- **URL:** [17525](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17525)
- **State:** Removed
- **Area:** Digital-Services
- **Tags:** QualityAssurance
- **Created:** 2025-11-06T12:53:23.047Z
- **Changed:** 2025-11-26T13:13:09.963Z

### Repro Steps

https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1762432900511279
Environment: stage/prod 
 
Preconditions: 
• Dutch language is selected in user profile 
  
Steps: 
• Place order or create visit-report with yourself selected to be notified 
  
Actual result: 
User received email in English 
 

 

 
Expected result: 
Emails should be in Dutch if this language is selected in user profile

---

## Bug #17369: [Prod] Orderable day does not appear to be orderable until after refreshing the page

- **URL:** [17369](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17369)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; QualityAssurance; Web
- **AssignedTo:** Nazar Olynets
- **Created:** 2025-10-29T12:32:47.84Z
- **Changed:** 2025-11-26T07:55:58.243Z

### Repro Steps

Env: PROD
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1761728565339379
 
Preconditions: 
 
 
 
 
• Kopppert.one is opened 
 Steps: 
• Login 
• Open Planner with linked enterprise Koppert Cress b.v. 
• Check available for ordering days 
• Refresh the page 
• Check days againa 
 Actual result:  Sometimes an orderable day does not appear to be orderable until after refreshing the page  
 
 
Expected result:  Orderable days should be displayed correctly

---

## Bug #17544: The duplicated order is created after adding more products to the order for the same day

- **URL:** [17544](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17544)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Planner; QualityAssurance; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-11-07T14:03:39.953Z
- **Changed:** 2025-11-24T12:58:57.83Z

### Repro Steps

STR:
• Open Planner 
• Add quantity to a few products
 
• Order it 
• Add quantity to some another product for the same day 
• Order it 
• Check order

 
 Actual result: the new order is created with the newly added product instead of adding a product to the existing order
Expected result: only one order is created, and a new product is added to the existing order

---

## Bug #17425: Different data on Planner

- **URL:** [17425](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17425)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; Production; QualityAssurance
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-03T14:58:59.85Z
- **Changed:** 2025-11-24T12:36:32.65Z

### Repro Steps

Environment: prod 
 
 
Preconditions:• Kopppert.one is opened 
• User has Orderer role 
• User has a few Enterprises with locations 
 Steps: 
• Open Planner for user 1  
• Open Planner for user 2 
• Koppert customer service creates order (line) of 10 Sticky plates
 
• Compare data
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1762181492868949
 
  
Actual result: Different data on Planner for two users

 
Expected result: Data should be the same on Planner

---

## Bug #17294: The order confirmation email doesn't arrive

- **URL:** [17294](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17294)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Planner; Production; QualityAssurance; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-10-22T08:02:59.747Z
- **Changed:** 2025-11-24T12:12:05.99Z

### Repro Steps

Environment: prod 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• NL/Canada/USA Enterprise is selected 
• Planner is opened 
 Steps: 
• Enter qty  
• Click on Order button -> Confirm 
• Pay attention to email
 
  
Actual result: The order confirmation email doesn't arrive 

 
Please, look at the NL6-SO00256607 in company Harry Wubben Flowers that doesn't receive the email. Order was not created in Planner btw, but in Sana webshop. Please, look at discussion -> https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1761119593044599
 
Expected result: Order confirmation email should be arrived

---

## Bug #14031: Enterprise/Location is not changed when ordering product from location that haven't had any orders before

- **URL:** [14031](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/14031)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Enterprise; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-04-09T12:47:16.067Z
- **Changed:** 2025-11-20T12:27:02.91Z

### Repro Steps

Environment: 2.2.5 stage 
 
 
Preconditions: 
• User is logged in to Kopper One mobile app  
• User have an Enterprise 1 - Agrifirm NWE B.V.location 1 with orders - Agrifirm NWE B.V.

 
• User have an Enterprise 2 - Agro Care 7 WP7 Exploitatie B.V.
location 2 without orders but with order date - Agro Care 7 WP7 Exploitatie B.V. 16

 
• User has access to orders and order mode on 
 Steps: 
• Click on More -> Select Enterprise 1 
• Click on Planner -> Enterprise 1 is displayed on Mode OFF 
• Click on Mode ON 
• Select location 2  from Enterprise 2 -> location 2 without orders but with order date  
• Perform ordering  
• Pay attention to the Enterprise in Mode OFF 
 Actual result:
• Enterprise 1 with selected location 1 is displayed 
• Enterprise/Location is not changed when ordering product from location that haven't had any orders before 
  

 
 
 

 
Expected result: 
• Enterprise 2 with selected location 2 should be displayed 
• Enterprise/Location should be changed when ordering product from location that haven't had any orders before

---

## Bug #17507: Removed qty appears again during Conflict location modal is displaying

- **URL:** [17507](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17507)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Planner; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-06T09:47:34.733Z
- **Changed:** 2025-11-20T11:27:39.05Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Planner is opened -> Mode On  
• User has order with Product 1 Product 2 
 Steps: 
• Remove qty fro Product 1 and Product 2 -> Save -> Confirm 
• Enter qty for Product 3 during the order processing for the same day 
• Pay attention to the removed qty  during Conflict location modal is displaying  
  
Actual result: Removed qty appears again during Conflict location modal is displaying  
 
Expected result: Removed qty should NOT appear again during Conflict location modal is displaying

---

## Bug #17707: Life stage 'unspecified' shown in Visit reports

- **URL:** [17707](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17707)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; PBI; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-18T12:29:40.61Z
- **Changed:** 2025-11-19T14:53:21.11Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Visits report is opened 

 
 Steps: 
• Click +Visit Report/ or click on View -> Edit 
• Pay attention to the Life stage 'unspecified' for scoutables
https://koppertplatform.slack.com/archives/C0464PF164W/p1763464004403299
 
  
Actual result: Life stage 'unspecified' shown in Visit reports

 
Expected result: Life stage 'unspecified' should NOT be shown in Visit reports

---

## Bug #17699: Attachments are not migrated

- **URL:** [17699](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17699)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** BE; Consultant notes; Production; Visit reports; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-17T15:48:08.32Z
- **Changed:** 2025-11-18T09:54:24.813Z

### Repro Steps

Environment: prod 
 
 
Preconditions: 
• User is logged in to Kopper One mobile app  
• User has access to orders and order mode on 
 Steps: 
• Enterprise B.J. Schoone on PRD 
• Check Consultant notes (there's 4) 
• 
https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1763392771848169
 
 Actual result: Only content is attachments. Visit report is fully empty
 
 
 
 
 
Expected result: Should be migrated

---

## Bug #17532: Incorrect text is displayed for Deleting quantities leave guard on WEB stage

- **URL:** [17532](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/17532)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** FE; Orders; Web
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-11-06T16:41:03.68Z
- **Changed:** 2025-11-17T13:59:31.35Z

### Repro Steps

Environment:   dev 
 
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer  
• User logged in to Koppert One 
• Orders list is displayed 
• User has order with Product 1 Product 2 
 Steps: 
• Click on View details -> Edit  
• Remove qty -> Save  
• Pay attention to the text 
  
Actual result: Incorrect text is displayed for Deleting quantities leave guard on WEB stage 
 
Expected result: Text should be as on screen from dev

---

## Bug #15373: Value can be changed during the blurred screen when new data is loading on Android

- **URL:** [15373](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15373)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Android; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-07-11T07:21:10.853Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.5.0_OTA_2 stage. Android 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON i 
 Steps: 
• Make any changes with order value -> edit/delete/create 
• Trigger 'We got the new data' pop-up 
• Continue making changes 
• Pay attention to the value when screen is blurred 
  
Actual result: Value can be changed during the blurred screen when new data is loading on Android 
 
Expected result: Value should not be changed during the blurred screen when new data is loading on Android

---

## Bug #15372: Enterprise drop-down arrow appears with small delay

- **URL:** [15372](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15372)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Regression
- **AssignedTo:** Ivan Dutka
- **Created:** 2025-07-11T07:01:13.823Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.5.0_OTA_2 stage 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode OFF 
 Steps: 
• Change the Enterprise  
• Click on More 
• Pay attention to the drop-down arrow 
• Close/hide the app 
• Open the app again  
• Pay attention to the drop-down arrow 
  
Actual result: Enterprise drop-down arrow appears with small delay 
 
Expected result: Enterprise drop-down arrow should be displayed together with Entr drop-down( maybe we can add louder as on Planner TDB)

---

## Bug #15370: Zero can be entered for a new order

- **URL:** [15370](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15370)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-07-10T09:32:17.157Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.5.0_OTA_2 stage 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON  
 Steps: 
• Enter zero in empty input  
• Pay attention to the input 
  
Actual result: Zero can be entered for a new order 
 
Expected result: Zero should NOT be entered for a new order (as on WEB)

---

## Bug #15369: 'We got the new data' pop-up doesn't appear in case when app in hidden or phone is blocked

- **URL:** [15369](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15369)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-07-10T08:58:31.527Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.5.0_OTA_2 stage 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON  
 Steps: 
• Trigger 'We got the new data' pop-up  
• Before the pop-up appears hide the app or block the phone  
• Open the app again  
• Pay attention to the 'We got the new data' pop-up 
  
Actual result: 'We got the new data' pop up doesn't appear  

 
Expected result: 'We got the new data' pop-up should appear

---

## Bug #15347: The data is not deleted on planner in mode OFF after deleting it on planner in mode ON

- **URL:** [15347](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15347)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Planner
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-07-09T09:29:23.653Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Preconditions:• User logged in to Koppert One  
• Entr has a few locations 
• Planner is opened 
• The order is created 
 Steps: 
• Delete some order 
• Check the data on planner in mode OFF 
 Actual result: the deleted data is still displayed on the planner in mode OFF
Expected result: data is completely deleted

---

## Bug #15346: Error appears when delete order and create a new one for the same product and day

- **URL:** [15346](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15346)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-07-09T09:14:59.233Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Version: 2.5.0. stage. 
 
 
 
 
Device: Android, iOS 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• User has some order  
• User opens Planner -> mode ON 
 Steps: 
• Delete order -> Confirm  
• Click Order mode button -> Mode On opens 
• Create order for the same day and product -> Save 
• Pay attention planner (please, look at the 29 sec of attached video) 
  
Actual result: Error appears when delete order and create a new one for the same product and day 
 
Expected result: Error should NOT appear when delete order and create a new one for the same product and day

---

## Bug #15303: The order details pop up is not closed after order deleting

- **URL:** [15303](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15303)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-07-07T12:30:57.93Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.4.18_OTA_6 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON -> Location 1 on mobile 
• User has already created an order 
 Steps: 
• Click on Order box in the mobile app -> Order details modal opens 
• Delete the order in the Web app 
• Pay attention to the order details pop up in the mobile app 
 Actual result: The data is cleared inside the pop up, but the pop up is not closed 
 
Expected result: The pop up is closed since the order doesn't exist anymore

---

## Bug #15293: The 'We got the new data' pop up doesn't appear in case the order is created in the F&O and Order details is opened

- **URL:** [15293](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15293)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-07-07T08:41:13.137Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.4.18_OTA_6 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON -> Location 1 on mobile 
 Steps: 
• Click on Order box -> Order details modal opens 
• Add the order reference/ note -> don't Save 
• Create the order in the F&O for the same location 
• Pay attention to the 'We got the new data' pop-up

Note: please, look at the attachments
Android - the same location but Order details modal is opened
iOS - the same location but Order details modal is not opened 
  
Actual result:  
• The 'We got the new data' pop up doesn't appear  
• Inf from order reference/ note fields is still displayed 
  
 
Expected result:  
• 'We got the new data' pop-up appears  
• Inf from order reference/ note fields should be cleared or Order details modal should be closed (TBD)

---

## Bug #15262: Terms&cond modal appears on Android (not on iOS and web) for user that has already confirmed Terms&cond

- **URL:** [15262](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15262)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Mobile; Ordering - mobile; Regression
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-07-03T11:35:19.817Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment: dev, Android, v2.4.18_OTA_3
 
Reproduced on stage 2.5.0 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• User doesn't confirmed Terms&cond  
• User log in with the same user on both devices:
- iOS
-Andr 
• User opens Planner -> mode OFF 
 Steps: 
• Click on Order mode button on iOS 
• Confirmed Terms&cond on iOS
 
• Open Planner on Android 
• Click on Order mode button on Android
 
• Pay attention Terms&cond modal 
  
Actual result: Terms&cond modal appears on Android (not on iOS and web) for user that has already confirmed Terms&cond on iOS 
 
Expected result: Terms&cond modal should NOT appear for users that have already agreed them

---

## Bug #15137: The 'We got the new data' pop up doesn't appear in case the order is created in the F&O

- **URL:** [15137](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15137)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-06-26T09:08:24.957Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.4.18_OTA_2 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON -> Location 1 on mobile 
 Steps: 
• Select an enterprise 
• Add the order/make changes on the planner in the mobile app -> don't Order 
• Create the order in the F&O for the same location 
• Pay attention to the 'We got the new data' pop-up 
  
Actual result: 'We got the new data' pop up doesn't appear on the mobile device. Note: it doesn't work for newly created order and order with Scheduled status. 
 
Expected result: 'We got the new data' pop-up appears on a mobile device

---

## Bug #15134: 'We got the new data' pop up doesn't appear in case when making changes only with order reference/note on the same Locations

- **URL:** [15134](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15134)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-06-25T14:49:16.967Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.4.18_OTA_2 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON -> Location 1 on iOS 
• Planner is opened -> Mode ON -> Location 1 on Android
 
• Some order has been already created on Location 1 at Wed 25 
 Steps: 
• Click on order box on iOS and Android on Location 1 at Wed 25 
• Add order reference on Android 
• Add order reference on iOS 
• Click on Save on iOS 
• Pay attention to the 'We got the new data' pop-up on Android 
  
Actual result:  
• 'We got the new data' pop up doesn't appear in case when making changes only with order reference/note on the same Locations 
• Order reference is still displayed on Android but the changes has already saved from iOS 
 
• Order details modal continue displaying 
 
  

 
Expected result:  
• 'We got the new data' pop up doesn't should appear in case when making changes with order reference/note on the same Locations 
• The newest changes should be applied 
• Order details modal should be closed

---

## Bug #15133: 'We got the new data' pop up doesn't appear in case when simple order is created (from Orders list) and another order has already placed on Planner

- **URL:** [15133](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15133)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-06-25T13:57:33.627Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.4.18_OTA_2 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON -> Location 1 on mobile 
• Orders list is opened  
• Some order has been already created on Location 1 at Wed 25 
 Steps: 
• Make any changes on mobile on Location 1 at Wed 25 
• Click on +Create order on WEB 
• Select Location 1  
• Select Wed 25 
 
• Enter any qty -> Save 
• Pay attention to the 'We got the new data' pop-up
NOTE: the same when Order is Blocked in Planner and a new one has been created from Orders list 
  
Actual result:  
• We got the new data' pop up doesn't appear in case when double order is created 
• Green box continue displaying when input for this day are blocked and orange 
• Next week can not be opened due to warning pop-up that order is not finished 
• Order button is active an order can be performed when day is blocked

 
  
Expected result:  
• We got the new data' pop up should appear in case when double order is created 
• Green box continue should not be displayed when input for this day are blocked and orange 
• Next week should be opened due to warning pop-u that order is not finished 
• Order button should not be active an order can be performed when day is blocked

---

## Bug #15125: The 'We got the new data' pop up doesn't appear in case the order is created on Web and rescheduled to the next week

- **URL:** [15125](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15125)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-06-25T11:53:36.45Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.4.18_OTA_2 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON -> Location 1 on mobile 
• Planner is opened -> Mode ON -> Location 1 on WEB 
 Steps: 
• Select the Agrifirm NWE BV enterprise 
• Add the order on planner in the mobile app on Saturday-> don't Order
 
• Add the order on planner in the Web app on Saturday -> Order it 
• Check that the order is created for Monday next week 
• Pay attention to the 'We got the new data' pop-up 
  
Actual result: 'We got the new data' pop up doesn't appear on the mobile device.

 
 
Expected result: 'We got the new data' pop-up appears on a mobile device

---

## Bug #15119: Order reference/note is not updated for user 1 when changes made by user 2

- **URL:** [15119](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15119)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Liliia Bilan
- **Created:** 2025-06-24T11:14:19.417Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.4.17 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON 
 Steps: 
• Click on order box on Location 1 for user 1 (iOS) 
• Add/Change Order reference/note 
• Click on the same order box on Location 1 for user 2 (Andr) 
• Pay attention to the reference/note on Location 1 for user 2 (Andr) 
  
Actual result: Order reference/note is not updated  

 

 
Expected result: Order reference/note should be updated and displayed the newest inf

---

## Bug #15118: Order reference/note is not updated when the modal is displayed and changes was made from another user

- **URL:** [15118](https://dev.azure.com/projectdisco/Digital-Services/_workitems/edit/15118)
- **State:** Done
- **Area:** Digital-Services
- **Tags:** Lag Buster; Mobile; Ordering - mobile; PBI
- **AssignedTo:** Mariana Mykhalevych
- **Created:** 2025-06-24T10:08:24.223Z
- **Changed:** 2025-11-14T11:27:10.63Z

### Repro Steps

Environment:  v2.4.17 
 
 
Preconditions:• Kopppert.one is opened 
• User has Admin role 
• User has a few Enterprises with locations 
• Planner is opened -> Mode ON 
 Steps: 
• Click on order box on Location 1 for Client 1 
• Click on order box on Location 1 for Client 2 
• Add order reference/note on Location 1 for Client 1 -> Save  
• Pay attention to the reference/note on Location 1 for Client 1 

 
  
Actual result: Order reference/note is not updated when the modal is displayed and changes was made from another user (but the synk time is updated) 
 
Expected result:  Changes should appear

---

