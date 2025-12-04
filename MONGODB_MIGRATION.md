# MongoDB Migration Guide

## Status Migrasi
✅ MongoDB package installed
✅ Database connection updated (`src/lib/db.ts`)
✅ TypeScript types updated (Users, Posts, Projects, Experience)
✅ API Login updated
✅ API Posts updated (GET, POST, PUT, DELETE)

## Yang Masih Perlu Diupdate:

### 1. API Routes (Prioritas Tinggi)
- [ ] `src/app/api/projects/route.ts` - CRUD Projects
- [ ] `src/app/api/projects/[slug]/route.ts` - Get single project
- [ ] `src/app/api/posts/[slug]/route.ts` - Get single post
- [ ] `src/app/api/experience/route.ts` - Get experiences
- [ ] `src/app/api/admin/stats/route.ts` - Dashboard stats

### 2. Dashboard Components (Prioritas Tinggi)
- [ ] `src/app/(admin)/dashboard/posts/page.tsx` - Update `post_id` → `_id`
- [ ] `src/app/(admin)/dashboard/posts/edit/[id]/page.tsx` - Update ID handling
- [ ] `src/app/(admin)/dashboard/projects/page.tsx` - Update `project_id` → `_id`
- [ ] `src/app/(admin)/dashboard/projects/edit/[id]/page.tsx` - Update ID handling

### 3. Environment Variables
Update `.env.local`:
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017
DB_NAME=satriame

# Keep existing
JWT_SECRET=SATRIAAPRILIAN48GMAILCOM
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. MongoDB Setup
1. Install MongoDB di local atau gunakan MongoDB Atlas (cloud)
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB

   # Mac/Linux
   sudo systemctl start mongod
   ```
3. Create database dan collections:
   ```js
   use satriame
   db.createCollection("users")
   db.createCollection("posts")
   db.createCollection("projects")
   db.createCollection("experiences")
   ```

### 5. Data Migration dari MySQL
Jalankan script migration untuk export data dari MySQL dan import ke MongoDB.

## Perubahan Utama MySQL → MongoDB:

| MySQL | MongoDB |
|-------|---------|
| `post_id` (int) | `_id` (ObjectId) |
| `project_id` (int) | `_id` (ObjectId) |
| `user_id` (int) | `_id` (ObjectId) |
| `exp_id` (int) | `_id` (ObjectId) |
| SQL Queries | MongoDB find/insert/update/delete |
| JOIN queries | Embedded documents atau lookup |
| `NOW()` | `new Date()` |

## Testing Checklist:
- [ ] Test login dengan user yang ada di MongoDB
- [ ] Test create/read/update/delete posts
- [ ] Test create/read/update/delete projects
- [ ] Test dashboard statistics
- [ ] Test experience listing

## Rollback Plan:
Jika ada masalah, MySQL masih ada. Tinggal:
1. `npm uninstall mongodb`
2. `npm install mysql2`
3. Restore `src/lib/db.ts` dari git history
