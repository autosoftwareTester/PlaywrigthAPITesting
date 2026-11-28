# SauceDemo end-to-end test plan

## Application Overview

Fresh-state Playwright test plan for the SauceDemo web store, covering authentication, inventory sorting and details, cart management, checkout validation and completion, and menu behavior.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login with a valid standard user

**File:** `tests/web-tests/saucedemo-login.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The page title is Swag Labs.
    - expect: A username textbox, password textbox, and Login button are visible.
  2. Enter standard_user in Username, enter secret_sauce in Password, and activate Login.
    - expect: The browser navigates to /inventory.html.
    - expect: The Products heading is visible.
    - expect: The inventory contains six products.

#### 1.2. Reject invalid and locked-out credentials

**File:** `tests/web-tests/saucedemo-login.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The login form is visible and no authentication error is present.
  2. Enter invalid_user and wrong_password, then activate Login.
    - expect: The current URL remains /.
    - expect: An error identifies that the username and password do not match.
  3. Enter locked_out_user and secret_sauce, then activate Login.
    - expect: The current URL remains /.
    - expect: An error states that the user has been locked out.
    - expect: The inventory page is not displayed.
  4. Submit the login form with Username and Password both empty.
    - expect: An error states that Username is required.
    - expect: The inventory page is not displayed.

#### 1.3. Validate each login field independently

**File:** `tests/web-tests/saucedemo-login.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to the login page.
    - expect: The login form is ready for input.
  2. Enter standard_user as the username and leave Password empty, then activate Login.
    - expect: An error states that Password is required.
    - expect: No navigation to inventory occurs.
  3. Clear the username and enter secret_sauce as the password, then activate Login.
    - expect: An error states that Username is required.
    - expect: No navigation to inventory occurs.

#### 1.4. Verify logout resets the authenticated session

**File:** `tests/web-tests/saucedemo-login.spec.ts`

**Steps:**
  1. Login successfully with standard_user and secret_sauce.
    - expect: The inventory page is visible.
  2. Open the menu and select Logout.
    - expect: The browser returns to the login page.
    - expect: The login form is visible and empty.
    - expect: The inventory page and cart are no longer accessible through the current session.
  3. Navigate directly to /inventory.html.
    - expect: The application redirects to the login page or prevents access to inventory.

### 2. Inventory

**Seed:** `tests/seed.spec.ts`

#### 2.1. Sort inventory by every available option

**File:** `tests/web-tests/saucedemo-inventory.spec.ts`

**Steps:**
  1. Login successfully with standard_user and secret_sauce.
    - expect: The initial sort is Name (A to Z).
    - expect: All six products are displayed.
  2. Select Name (Z to A).
    - expect: The product names are displayed in descending alphabetical order.
    - expect: The first and last products from the initial list are reversed.
  3. Select Price (low to high).
    - expect: The products are ordered by ascending price.
    - expect: The $7.99 Onesie is first and the $49.99 Fleece Jacket is last.
  4. Select Price (high to low).
    - expect: The products are ordered by descending price.
    - expect: The $49.99 Fleece Jacket is first and the $7.99 Onesie is last.
  5. Return to Name (A to Z).
    - expect: The product list is restored to ascending alphabetical order.

#### 2.2. Open and return from a product details page

**File:** `tests/web-tests/saucedemo-inventory.spec.ts`

**Steps:**
  1. Login successfully and open the Sauce Labs Backpack details page.
    - expect: The details page shows the correct product name, description, price, and image.
    - expect: Add to cart is available.
  2. Add the product to the cart, then use Back to products.
    - expect: The cart badge shows one item.
    - expect: The inventory page is restored.
    - expect: The backpack's action button remains Remove, preserving cart state.

#### 2.3. Add and remove all inventory items

**File:** `tests/web-tests/saucedemo-inventory.spec.ts`

**Steps:**
  1. Login successfully and add every inventory item to the cart.
    - expect: Each item changes from Add to cart to Remove.
    - expect: The cart badge shows six items.
  2. Remove every item.
    - expect: Each item changes from Remove to Add to cart.
    - expect: The cart badge is empty or removed.
    - expect: A cart containing six items cannot remain.

### 3. Cart

**Seed:** `tests/seed.spec.ts`

#### 3.1. Manage cart contents and continue shopping

**File:** `tests/web-tests/saucedemo-cart.spec.ts`

**Steps:**
  1. Login successfully and add the Sauce Labs Backpack.
    - expect: The backpack action changes to Remove.
    - expect: The cart badge shows one item.
  2. Open the cart.
    - expect: The cart URL is /cart.html.
    - expect: Your Cart is visible.
    - expect: The backpack is listed once with quantity 1 and price $29.99.
    - expect: Continue Shopping and Checkout are visible.
  3. Remove the backpack from the cart.
    - expect: The cart contains no products.
    - expect: The cart badge is cleared.
  4. Select Continue Shopping and add a second item.
    - expect: The inventory page is shown.
    - expect: The Bike Light can be added and the cart badge shows one item.

#### 3.2. Preserve cart contents while navigating

**File:** `tests/web-tests/saucedemo-cart.spec.ts`

**Steps:**
  1. Login successfully and add the Backpack and Bike Light.
    - expect: The cart badge shows two items.
  2. Open the cart, then activate Continue Shopping.
    - expect: No cart item is lost.
    - expect: The inventory view is restored.
  3. Open the cart again.
    - expect: Both Backpack and Bike Light are listed with quantity 1.

### 4. Checkout

**Seed:** `tests/seed.spec.ts`

#### 4.1. Complete an end-to-end purchase

**File:** `tests/web-tests/saucedemo-checkout.spec.ts`

**Steps:**
  1. Login successfully and add the Sauce Labs Backpack to the cart.
    - expect: The cart badge shows one item.
  2. Open the cart and select Checkout.
    - expect: The URL is /checkout-step-one.html.
    - expect: Checkout: Your Information is visible.
    - expect: First Name, Last Name, and Zip/Postal Code fields are displayed.
  3. Enter valid values in all three fields and select Continue.
    - expect: The URL is /checkout-step-two.html.
    - expect: Checkout: Overview is visible.
    - expect: The Backpack and its $29.99 price are shown.
    - expect: Item total is $29.99 and tax plus total are calculated.
  4. Select Finish.
    - expect: The URL is /checkout-complete.html.
    - expect: A success message is displayed.
    - expect: The cart badge is cleared.
  5. Select Back Home.
    - expect: The inventory page is visible.
    - expect: No previous cart items remain.

#### 4.2. Validate required checkout information

**File:** `tests/web-tests/saucedemo-checkout.spec.ts`

**Steps:**
  1. Login, add at least one item, open the cart, and select Checkout.
    - expect: The checkout information form is visible.
  2. Leave all fields empty and select Continue.
    - expect: An error states that First Name is required.
    - expect: The overview page is not displayed.
  3. Enter only a first name and select Continue.
    - expect: An error states that Last Name is required.
    - expect: The overview page is not displayed.
  4. Enter a first name and last name but leave Postal Code empty, then select Continue.
    - expect: An error states that Postal Code is required.
    - expect: The overview page is not displayed.

#### 4.3. Cancel checkout from both information and overview steps

**File:** `tests/web-tests/saucedemo-checkout.spec.ts`

**Steps:**
  1. Login, add one item, open the cart, and enter checkout.
    - expect: Checkout: Your Information is visible.
  2. Activate Cancel on the information step.
    - expect: The browser returns to the cart.
    - expect: The selected item remains in the cart.
  3. Select Checkout, enter valid information, and continue to the overview.
    - expect: Checkout: Overview is visible.
    - expect: The cart item and totals are shown.
  4. Activate Cancel on the overview step.
    - expect: The browser returns to the inventory page.
    - expect: The selected item remains in the cart.

#### 4.4. Prevent checkout with an empty cart

**File:** `tests/web-tests/saucedemo-checkout.spec.ts`

**Steps:**
  1. Login successfully, open the cart, and do not add any items.
    - expect: The cart is empty.
    - expect: No product details are listed.
  2. Activate Checkout.
    - expect: Checkout is disabled or rejected and the checkout information page is not shown.
    - expect: The application remains on the cart page or presents a clear empty-cart condition.

#### 4.5. Verify checkout totals for multiple items

**File:** `tests/web-tests/saucedemo-checkout.spec.ts`

**Steps:**
  1. Login and add the $7.99 Onesie and $49.99 Fleece Jacket.
    - expect: The cart badge shows two items.
  2. Open the cart and complete checkout with valid information.
    - expect: The overview lists both products.
    - expect: Item total is $57.98.
    - expect: Tax is calculated at the application-defined rate and total equals Item total plus tax.
    - expect: Finish completes the purchase successfully.
