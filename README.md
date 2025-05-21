# Test automation assignment

This is a repository containing automation tests for a sample website: https://magento.softwaretestingboard.com/

The scope is limited to regression test plan scenarios focused on the order placement process as per the assignment. Below you can find a rough outline of the tests structure:
- Homepage sanity check
- Checkout item from homepage
- Checkout item directly from an item page
- Complete purchase process while logged in
- Complete purchase process while guest -> For some reason the dropdowns are not found by the engine so the tests are implemented, but are skipped

# Running the tests

Assuming you have npm installed, you can:
- Pull the repo
- Run ```npm install```
- For running tests in the playwright UI, run ```npm run fe:tests:ui```
- For running tests headless, run ```npm run fe:tests```

NOTE: .env file is tracked in order to have access to current variables. Good practice dictates it should not be, it was only done for easier evaluation of the assignment
