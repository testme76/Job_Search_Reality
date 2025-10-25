# Vercel Postgres Setup Guide

## 1. Create Vercel Postgres Database

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create a new one)
3. Navigate to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres** as the database type
6. Choose your region (select closest to your users)
7. Click **Create**

## 2. Copy Environment Variables

1. After creating the database, Vercel will show you the connection details
2. Click on the **.env.local** tab to see all environment variables
3. Copy all the Postgres environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NO_SSL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`

4. Paste them into your local `.env.local` file (replace the `************` placeholders)

## 3. Initialize Database Schema

Once your environment variables are set up, initialize the database:

### Option A: Using the API Route (Recommended for Development)

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to or make a request to:
   ```
   http://localhost:3000/api/db/init
   ```

3. You should see a success message:
   ```json
   {
     "success": true,
     "message": "Database initialized successfully"
   }
   ```

### Option B: Using Vercel Dashboard (Recommended for Production)

1. Go to your Vercel Postgres database in the dashboard
2. Click on the **Query** tab
3. Copy and paste the contents of `lib/db/schema.sql`
4. Click **Run Query**

## 4. Verify Setup

Test that everything is working:

```bash
# Get filter options (should return empty arrays if no data yet)
curl http://localhost:3000/api/filters

# Get stats (should return zeros if no data yet)
curl http://localhost:3000/api/stats

# Get survey responses (should return empty array if no data yet)
curl http://localhost:3000/api/survey
```

## 5. Add Test Data (Optional)

You can add a test survey response:

```bash
curl -X POST http://localhost:3000/api/survey \
  -H "Content-Type: application/json" \
  -d '{
    "applications_sent": 150,
    "interviews": 12,
    "offers": 2,
    "major": "Computer Science",
    "school_tier": "Target",
    "needs_sponsorship": false,
    "location": "San Francisco",
    "experience_level": "New Grad"
  }'
```

## 6. Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add Vercel Postgres integration"
   git push
   ```

2. In Vercel Dashboard:
   - Your project will automatically deploy
   - The environment variables from your Postgres database are automatically injected
   - No need to manually add them to your project settings

3. After deployment, initialize the production database:
   ```
   https://your-project.vercel.app/api/db/init
   ```

## API Endpoints

Your app now has these API endpoints:

- **GET** `/api/db/init` - Initialize database schema
- **GET** `/api/survey` - Get survey responses (with optional filters)
- **POST** `/api/survey` - Submit a new survey response
- **GET** `/api/stats` - Get aggregated statistics (with optional filters)
- **GET** `/api/filters` - Get available filter options

### Query Parameters for Filtering

All endpoints support these query parameters:
- `major` - Filter by major (e.g., "Computer Science")
- `school_tier` - Filter by school tier (e.g., "Target", "Reach", "Safety")
- `needs_sponsorship` - Filter by sponsorship (true/false)
- `location` - Filter by location (e.g., "San Francisco")
- `experience_level` - Filter by experience (e.g., "New Grad", "Internship")

Example:
```
/api/stats?major=Computer%20Science&needs_sponsorship=false
```

## Migration from Google Sheets

If you're currently using Google Sheets, you can:

1. Keep both systems running simultaneously
2. Export your existing Google Sheets data
3. Import it into Postgres using the POST `/api/survey` endpoint
4. Once migrated, update your frontend to use the new API endpoints
5. Remove Google Sheets environment variables from `.env.local`

## Troubleshooting

### Connection Errors
- Verify all environment variables are set correctly
- Check that your Vercel Postgres database is active
- Ensure you're using the correct region

### Schema Errors
- Make sure you ran the initialization step
- Check the Vercel dashboard for any database errors

### Rate Limits
- Vercel Postgres has usage limits based on your plan
- Monitor your usage in the Vercel dashboard
- Consider upgrading if you hit limits

## Security Notes

- Never commit `.env.local` to git (already in .gitignore)
- Environment variables are automatically secure in Vercel
- All database connections use SSL by default
- Consider adding rate limiting for production APIs
