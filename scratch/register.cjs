const { execSync } = require('child_process');

const args = {
  title: "Introduction to Robotics",
  classLevel: "Basic 9",
  subjectId: "jx78cf2rx89epra9h8bk878fkx89a5dp",
  staticLookupKey: "robotics-basics"
};

// In Windows cmd.exe, we must wrap the JSON in double quotes, and escape internal double quotes as \" or similar.
// Actually, let's just write a JS file that runs the Convex client directly to avoid shell parsing issues entirely!
// Let's load the ConvexClient.

const { ConvexClient } = require('convex/browser');
require('dotenv').config({ path: '.env.local' });

const client = new ConvexClient(process.env.VITE_CONVEX_URL);

async function register() {
  console.log("Registering note via ConvexClient...");
  try {
    const result = await client.mutation("notesIngestion:registerNoteMetadata", args);
    console.log("Success! Registered note ID:", result);
  } catch (err) {
    console.error("Mutation failed:", err);
  } finally {
    // ConvexClient keeps the connection open, so we must exit.
    process.exit(0);
  }
}

register();
