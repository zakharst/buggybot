# Derived bug-writing style (from your ADO backlog)

_Auto-generated. Do not edit by hand — re-run `npm run openai:derive-style-from-backlog` after refreshing the backlog export._

## How to use this with Slack intake

Your team’s **historical Bugs** were analyzed. When converting a **Slack** message to structured JSON:

- **deployment_environment** `dev` | `prod`: align with how reporters distinguish non-prod vs live (your backlog often starts repro with **`Env: dev`** — treat that as **dev**; production/live wording → **prod**).
- **platform** `iOS` | `Android` | "": only when the message clearly states the mobile OS.
- **preconditions**: bullets like *Koppert.one is opened as Admin*, *Overview page is opened*, *Enterprise is …* — mirror that granularity when Slack implies it.
- **steps_to_reproduce**: short imperative lines; backlog often uses **•** bullets under **Steps:** — keep one action per array element.
- **actual_result** / **expected_result**: single focused statements; backlog uses **Actual result:** / **Expected result:** labels — same meaning in JSON fields.
- **notes**: secondary scope (e.g. “same on Planner”) — do not duplicate steps.

## What we measured (
500
 bugs)

| Pattern | Share |
|--------|-------|
| Has non-empty **Description** tab | 1% |
| Has non-empty **Repro Steps** tab | 98% |
| Repro contains `Env:` line | 11% |
| Repro contains `Environment:` line | 54% |
| Repro mentions **Preconditions:** | 67% |
| Repro mentions **Steps:** | 66% |
| Repro mentions **Actual result:** | 92% |
| Repro mentions **Expected result:** | 92% |
| Steps block uses • bullets (heuristic) | 68% |

- **Average title length**: ~73 characters.
- **Average Repro Steps plain-text length**: ~546 characters.

## Common work item tags (frequency)

- **Web**: 225 bugs (45%)
- **PBI**: 199 bugs (40%)
- **FE**: 173 bugs (35%)
- **Mobile**: 166 bugs (33%)
- **Regression**: 109 bugs (22%)
- **BE**: 97 bugs (19%)
- **Planner**: 93 bugs (19%)
- **Ordering - mobile**: 65 bugs (13%)
- **Visit reports**: 58 bugs (12%)
- **Orders**: 55 bugs (11%)
- **QualityAssurance**: 52 bugs (10%)
- **Visit report**: 41 bugs (8%)
- **Production**: 39 bugs (8%)
- **Admin**: 30 bugs (6%)
- **Order List**: 25 bugs (5%)
- **Lag Buster**: 23 bugs (5%)
- **Ordering**: 19 bugs (4%)
- **Android**: 19 bugs (4%)

## Stratified excerpts (shape + voice — not for copying IDs)

_Spread across the backlog (first/middle/last and evenly between). Trimmed for token budget._

### Excerpt 1: NSO order is displayed on Overview

**Repro Steps (trimmed)**

```text
Env: dev Preconditions: • Kopppert.one is opened as Admin • Overview page is opened • Planner page is opened • Enterprise is C.J. Klep Steps: • Select 10 products on Planner • One product with lead time • Add qty for 10 products • Click on Order button • Refresh Overview • Click on Order box • Click on Open button • Pay attention to the order ID Actual result: • NSO order is displayed on Overview • Open button is available for NSO Expected result: should NOT be displayed (Open button as on Planner or Order at all, need to clarify) ---
```

### Excerpt 2: The locations stop loading in the list after opening the location details page

**Repro Steps (trimmed)**

```text
STR: HORTALAN MED, S.L. enterprise is linked to a user • Open Locations page • CLICK ON THE 'VIEW' BUTTON OF THE FIRST LOCATION IN THE LIST • Observe Location details • Return to Location list • Scroll down to load new locations Actual result: new locations are not loading Expected result: infinite scrolling works properly, new locations are displayed in the list after scrolling down ---
```

### Excerpt 3: Authors are not linked with users

**Repro Steps (trimmed)**

```text
There are some number of authors which have no linked user BUT user exists. Expected result: author doesn't have linked user only if user has been deleted because of GDPR request Actual result: ---
```

### Excerpt 4: User doesn't have any role after SANA export has processed

**Repro Steps (trimmed)**

```text
Pre conditions User already exists in Koppert one with Basic role STR: • Add user's email to the SANA export file • Process Sana export • Check user details Actual result: User doesn't have any role, but enterprise was assigned User's Email: lbilan+6@n-ix.com Expected result: user has 2 roles : Orderer+Grower ---
```

### Excerpt 5: Changing app language does not change the language of Form Errors until reload

**Repro Steps (trimmed)**

```text
Environment: dev, stage, prod Preconditions:• User has Admin • User logged in to Koppert One • Visit Report lists is displayed Steps: • Change the language of the app in My Profile. • Go to any form that has validation - Visit Report in the example screenshot. • Have the form in an invalid state and try to submit it. • Observe the error messages. Slack: https://koppertplatform.slack.com/archives/C08CXQ71EQZ/p1774538419742789 Actual: the error messages are in the previously selected language. Expected: the error messages are in the last selected language. ---
```

### Excerpt 6: Email notification about visit report is never getting delivered for some emails

**Repro Steps (trimmed)**

```text
• Create visit report with email notification set to vs3oym+c5xsstf11lckgxfj43v70dezw4vrgy7zly8@guerrillamail.com • observe network Expected result: /api/v1/visit-reports/{id}/send-notification should success Actual result It returns 429 or 504 error ---
```

### Excerpt 7: [Team members] Logged in user with Admin/Local Admin/Advisor role can edit user with Basic role

**Repro Steps (trimmed)**

```text
Preconditions: • User with Basic role exists in the system • User with Admin role exists in the system • User with Admin role can edit team members • Both users have the same enterprise added Steps: • Log into the system as an Admin user • Ensure you have selected the same enterprise that the basic user has • Open Organization > Team • Find and open details of the Basic user • Verify 'Edit' button Actual result: 'Edit' button is available Note: also reproducible for logged in users (viewers) with Advisor and Local Admin roles Expected result: 'Edit' button shouldn't be available when viewing Basic user (Scenario 2.4 from PBI) ---
```

### Excerpt 8: Visit report title is not displayed inside visit report

**Repro Steps (trimmed)**

```text
Environment: dev Build: v.3.3.3 Preconditions:• User logged in to Koppert One app as user with permissions to view visit reports Steps: • Open Visit report list page • Check Visit report title - title is visible • Open visit report details page • Check title Actual result: Title is not visible Expected result: Title should be displayed ---
```

### Excerpt 9: User can't edit Action in app for Scan Horiver observation after saving horiver scan

**Repro Steps (trimmed)**

```text
Precondition: create location and greenhouse department, log in to Natutec Scout app v.2.9.17 Steps to reproduce • Add active scout session for greenhouse department • Click at active scout session • Click at row&post • Click Scan Horiver • Take scan of front and back • Click Save • Click back to Scan Horiver • Click toggle Scan single-side and Card replace - on • Click Save? Expected result: when user change something should appear button Save to save changes Actual result: button Save is not appear after changes so user can't edit Action in app for Scan Horiver observation after saving horiver scan See attachments ---
```

### Excerpt 10: Delete account function doesn't work on mobile

**Repro Steps (trimmed)**

```text
Environment: dev Preconditions:• User has Admin + Allowed Country Advisor roles • User logged in to Koppert One • More is displayed -> User settings Steps: • Click on Delete account • Confirm Actual result: Delete account function doesn't work on mobile Expected result: User should be deleted and log in screen should be displayed ---
```

### Excerpt 11: [Mobile] Discard & Save btns are not responding sometimes

**Repro Steps (trimmed)**

```text
Environment: dev (IOS 3.1.1 OTA_1). Steps: • Open orders page as admin or orderer • Find editable order (order user in video is NL6-SO00252081 C.J Klep B.V) and open it • Press edit button • Change quantity for product and press Discard changes - in are you sure modal press no • Press Discard changes again Actual result: Are you sure modal is not opened for Discard and Save buttons Expected result: Discard and Save buttons reacting on click ---
```

### Excerpt 12: Changes are not applied when refreshing Mode ON after Price changing on User/Enterprise/Subsidiaries levels on WEB

**Repro Steps (trimmed)**

```text
Environment: dev Build: v.2.5.16 ota 3 Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer • User logged in to Koppert One • Planner is opened -> Mode On • Prices are visible for products Steps: • Open web -> turn OFF the prices Open the Admin page and set the following options for price visibility:Subsidiary: NoEnterprise: UndefinedUser: Undefined EXPECTED RESULT User is NOT able to see prices on Planner for the selected enterprise • Open mobile -> mode ON is still displayed • Refresh the screen • Click on info icon • Pay attention to the prices -> Prices is still visible • Click on Cancel button • Click on Order node button • Pay attention to the prices -> Prices disappears Actual result: Changes are not applied when refreshing Mode ON after Price changing on User/Enterprise/Subsidiaries levels on WEB Expected result: Changes should be applied when refreshing Mode ON ---
```

### Excerpt 13: Incorrect text is displayed and Order button becomes active after switching between tabs when F&O = 500 and user doesn't have cash

**Repro Steps (trimmed)**

```text
Version: 2.5.0. OTA 3 stage 2.4.19. OTA 2 dev Device: Android, iOS Preconditions:• Kopppert.one is opened • User has Admin role • User has NOT opened Planner yet -> doesn't have a cash • User opens Side effects Steps: • F&O = 500 • Add two enterprises on WEB • Click Planner • Pay attention to the warning text -> text is correct • Click on More • Click Planner • Pay attention to the warning text and Order mode button Actual result: • Incorrect text is displayed after switching between tabs when F&O = 500 and user doesn't have cash • Order mode button becomes active Expected result: • Text should not changed after switching between tabs when F&O = 500 and user doesn't have cash (look at WEB) • Order mode button should NOT become active ---
```

### Excerpt 14: Some password formats is not getting accepted on user creation

**Repro Steps (trimmed)**

```text
Steps to reproduce: • Create user • Get verification link from email • Open it, set password like: Somephrase123! • You will be logged in automatically, log out • Try to log in again Actual result: 401 error on login attempt More context: currently password like 1234567890 works, but if you try to log in just after user activation (via script), it still shows 401 error, if you patiently wait for 5-10 second, you'd be able to log in. So there is some time consuming password processing after user activation ---
```

### Excerpt 15: Incorrect button on the leave guard

**Repro Steps (trimmed)**

```text
Actual result: Expected result: ---
```

### Excerpt 16: CE Deeplink to Visit Report doesn't work if the user is not connected to the enterprise

**Repro Steps (trimmed)**

```text
Env: dev, stage, prod. Enterprise: any. Steps to reproduce: • Create a visit report with an email notification to the active user. • Ensure that the recipient user is not connected to the enterprise of the Visit Report. • Wait for the email notification about the Visit Report. • Try to navigate to the Visit Report by the link from the notification. Actual result: the user briefly sees the enterprise of the Visit Report in the selector, in read-only mode, but then is redirected back to the visit report list with a 500 error. Expected result: the user is navigated to the Visit Report and allowed to view it in read-only mode, even if they're not connected to the enterprise of that Visit Report. See attachments. ---
```

### Excerpt 17: Inf from Cultivar 2 moves to Cultivar 1 if information is not saved for cultivar after visit report creation

**Repro Steps (trimmed)**

```text
Environment: stage Preconditions:• Kopppert.one is opened • User has Admin role • User has a few Enterprises with locations • Visits report is opened Steps: • Click on + Visit report • Fill in all required fields • Add Cultivar 1 without any information • Click on Tick to save • Add Cultivar 2 with some information • Don't click on Tick • Click on + Create Visit report • Pay attention to the Cultivar 1 NOTE: the same for edit Actual result: Inf from Cultivar 2 was moved to Cultivar 1 Expected result: • on create report click ->- highlight the unsaved tab and do not create a visit report until the tab is saved/removed- scroll the page to get name field in view (add this inf from comments below) • if removing the tab (clicking on cross sign) with unsaved information -> show leave guard ---
```

### Excerpt 18: Search doesn't work in the 'Country' selector

**Repro Steps (trimmed)**

```text
STR: • Open Sign up page • Search in the 'Country' selector • Check result Actual result: search is not working Expected result: the data appears according to the search input ---
```

### Excerpt 19: Double order pop-up overlaps Products when decreasing the screen

**Repro Steps (trimmed)**

```text
Environment: dev Preconditions:• Koppert.One is opened • Planner is displayed • User has double order Steps: • Click on order box for double order • Decrease the screen • Pay attention to the pop-up Actual result: Double order pop-up overlaps Products when decreasing the screen Expected result: TBD ---
```

### Excerpt 20: Wrong location sorting

**Repro Steps (trimmed)**

```text
Preconditions:• User has Admin + Allowed Country Advisor roles -> to see footer • User logged in to Koppert One • Planner is displayed Steps: • Expand Locations drop-down • Pay attention to the Location sorting https://koppertplatform.slack.com/archives/C0464PF164W/p1763645056264349 Actual result: Wrong location sorting Expected result: should be alphabetically ---
```

### Excerpt 21: Leave guards don't appear after Location selection and close tab/browser

**Repro Steps (trimmed)**

```text
Environment: dev Preconditions:• Koppert.One is opened • User has linked Enterprises • Orders list is displayed Steps: • Click on any +Create order button • Select any location • Click on another page/module/section • Pay attention to the Leave guard • Click on any +Create order button • Select any location • Click on cross icon to close the tab/click on cross icon to close the browser • Pay attention to the Browser leave guard Actual result: Leave guards don't appear after Location selection and close tab/browser Expected result: Should appear (TBD) Please, look at the video VR ---
```

### Excerpt 22: Leave guard doesn't appear when swiping to the right on iPhone

**Repro Steps (trimmed)**

```text
STR: • Open Orders -> tap on the 'Create Order' button • Fill in some fields • Swipe to the right Actual result: leave guard doesn't appear Expected result: swiping is disabled ---
```

### Excerpt 23: The duplicated order is created after adding more products to the order for the same day

**Repro Steps (trimmed)**

```text
STR: • Open Planner • Add quantity to a few products • Order it • Add quantity to some another product for the same day • Order it • Check order Actual result: the new order is created with the newly added product instead of adding a product to the existing order Expected result: only one order is created, and a new product is added to the existing order ---
```

### Excerpt 24: Order reference/note is not updated when the modal is displayed and changes was made from another user

**Repro Steps (trimmed)**

```text
Environment: v2.4.17 Preconditions:• Kopppert.one is opened • User has Admin role • User has a few Enterprises with locations • Planner is opened -> Mode ON Steps: • Click on order box on Location 1 for Client 1 • Click on order box on Location 1 for Client 2 • Add order reference/note on Location 1 for Client 1 -> Save • Pay attention to the reference/note on Location 1 for Client 1 Actual result: Order reference/note is not updated when the modal is displayed and changes was made from another user (but the synk time is updated) Expected result: Changes should appear ---
```

---

_End of derived style guide. Full raw backlog may still be appended separately in the same system prompt (capped)._
