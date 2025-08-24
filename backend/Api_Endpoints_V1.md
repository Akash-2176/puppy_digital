"""# 🚀 Orbit Coupon System — API Contract (V1)

---

## 🔑 Auth Endpoints (`/auth/*`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/auth/register` | Register user with mobile no. (auto-create wallet) |
| POST | `/auth/login` | Login with mobile no. → JWT issued |

---

## 👤 User Endpoints (`/user/*`)

### 📌 Dashboard
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/user/coupon/check` | Validate coupon code (valid/invalid) |
| POST | `/user/coupon/redeem` | Redeem coupon → play random ad → credit Orbits |
| GET | `/user/ads/images` | Fetch carousel images |
| GET | `/user/ads/video` | Fetch random video ad (non-skippable) |
| GET | `/user/wallet` | Get wallet balance |
 
### 📌 Profile
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/user/profile` | Get user details (name, phone, orbits, etc.) |

### 📌 Wallet & Offers
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/user/offers` | List all offers available |
| POST | `/user/offers/redeem/:id` | Redeem an offer → request sent to Admin |
| GET | `/user/redemptions` | List user’s redemption history (completed + pending) |

---

## 👨‍💼 Admin Endpoints (`/admin/*`)

### 📌 Dashboard
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/admin/users` | List all users with wallet balances |
| GET | `/admin/users?phone=xxxx` | Search user by mobile no. |

### 📌 Redemption Management
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/admin/requests` | View all redemption requests (pending/approved) |
| PUT | `/admin/requests/:id/approve` | Approve a user’s redemption request |
| PUT | `/admin/requests/:id/reject` | Reject a redemption request |

### 📌 Offers
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/admin/offers` | Add new offer |
| PUT | `/admin/offers/:id` | Update existing offer |
| DELETE | `/admin/offers/:id` | Delete offer |

### 📌 Coupons
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/admin/coupons/bulk` | Bulk generate coupons (with values + expiry) |
| GET | `/admin/coupons` | List all coupons |
| DELETE | `/admin/coupons/:id` | Delete coupon (expired/invalid cleanup) |

### 📌 Ads (Media Management)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/admin/ads/video` | Upload video ad |
| DELETE | `/admin/ads/video/:id` | Delete video ad |
| POST | `/admin/ads/image` | Upload image ad |
| DELETE | `/admin/ads/image/:id` | Delete image ad |

---

## ⚡ Utility
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/health` | API health check (lambda + DB status) |
"""