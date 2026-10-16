# B.D. Fashion Store Pro

## Customer Google + Mobile login
- Customers tap **Continue with Google** on `account.html`. Firebase Authentication creates/signs in the Google account.
- After login, the customer's Google name, Gmail and profile photo are saved to Realtime Database. The customer must add a mobile number and can also save WhatsApp and delivery address in My Details.
- During checkout, the customer must enter/confirm their mobile number and complete delivery address. Orders are saved against their Firebase UID and appear in Admin → Customers / Orders.
- Email/password login remains available under “Already have an email and password account?” for existing customers. Admin login remains email/password.

## Pages
`index.html` storefront/search/category filters; `product.html` details; `cart.html`; `checkout.html`; `order-success.html`; `tracking.html`; `account.html`; `admin.html` dashboard; `admin-products.html`; `admin-stock.html` inventory adjustment/history; `admin-orders.html`; `admin-customers.html` customer directory; `admin-settings.html`; `contact.html`; `shipping-returns.html`; `size-guide.html`.

## Firebase setup
1. Open https://console.firebase.google.com/ and create/select your Firebase project.
2. In Project settings → General → Your apps, add a Web App (if not already present), copy its config and replace the placeholders in `firebase-config.js`.
3. In Authentication → Sign-in method (or Sign-in providers), enable **Google**. Select a support email and save. Keep **Email/Password** enabled only if you want the optional legacy login/admin password login.
4. In Authentication → Settings → Authorized domains, add your hosting domain (for example `yourdomain.com.np`). For local testing add/use `localhost`. Do not enter `https://` or a page path; enter only the domain.
5. Create/enable Realtime Database. In `firebase-config.js`, make sure `databaseURL` matches the URL shown in Realtime Database.
6. Replace `your-admin@gmail.com` in both `firebase-config.js` and `database.rules.json` with the exact admin Gmail in lowercase. Set your merchant UPI ID if you use UPI.
7. Publish the contents of `database.rules.json` in Realtime Database → Rules. Review/test rules in the Rules Simulator before accepting real orders.
8. Upload all files while preserving the same folder structure, or test with VS Code Live Server. Do not open HTML using `file://`.
9. Open `account.html`, click **Continue with Google**, choose a Google account, then fill Mobile number and delivery details and press **Save my details**. Open `admin.html` to log in as the configured admin, then use **Customers** to confirm the profile appears.

## Customer order cancellation
- In `account.html`, customers see their orders and can request cancellation only while the order is `Placed` or `Confirmed`.
- Requests appear in Admin → Orders under **Customer cancellation requests**.
- Admin can approve or reject. Approval updates the order to `Cancelled` and restores each product's stock using a per-order/product receipt marker, so repeated approval attempts do not add stock twice.
- If the order was marked paid, the order's refund status becomes `Refund pending`. The merchant must process the actual refund manually and set the status to `Refunded` in Admin → Orders. The website does not automatically send money back.
- Customer cancellation is a request, not an instant cancellation. Orders already shipped, out for delivery, delivered, or cancelled cannot be approved through this flow.

## Customer flow
1. Customer opens `account.html` and signs in with Google.
2. Customer enters mobile number (required), optional WhatsApp and address, then saves details.
3. At checkout, the customer confirms phone/address, selects COD or UPI, and places the order.
4. Admin can search the customer directory and manage order/payment/delivery status.

## Troubleshooting Google login
- `auth/operation-not-allowed`: enable Google provider in Firebase Authentication.
- `auth/unauthorized-domain`: add the exact site domain in Authentication → Settings → Authorized domains.
- Popup closes or is blocked: allow popups for the site and try again.
- Login succeeds but details do not save: confirm Realtime Database URL/config and that the published rules allow each signed-in user to read/write only their own `customers/{uid}` record.

## Included
Customer Google login, optional legacy email/password login, customer profile/contact/address form, customer directory, customer cancellation requests with admin approval/rejection and idempotent stock restoration, refund status tracking, product catalogue, category filters, search/sort, cart, checkout, COD/UPI intent, stock reservation, order confirmation, authenticated order tracking, admin product CRUD, stock increase/decrease/set, stock movement history, order status/payment admin, shipping and banner settings.

## Important before real launch
This is a client-side starter. The UPI link does not verify payment; admin must verify the merchant account and mark payment verified. Production-grade checkout/stock reservation and payment verification should be moved server-side (for example Cloud Functions/payment gateway). Do not put private keys in browser code. Test database rules and checkout carefully before taking real orders.
