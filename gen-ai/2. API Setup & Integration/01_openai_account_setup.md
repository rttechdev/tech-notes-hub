# OpenAI Account Setup and API Integration

## Introduction

To use OpenAI's models (GPT-4, GPT-3.5, etc.) in your Python projects, you need to:
1. Create an OpenAI account
2. Add billing/credits
3. Generate API keys
4. Use the API key in your code

This guide walks you through each step.

---

## Step 1: Create an OpenAI Account

### Navigate to OpenAI Platform

Go to: **[platform.openai.com](https://platform.openai.com)**

### Sign Up Options

You can sign up using:
- **Email address** (create new account)
- **Google account** (sign in with Google)
- **Microsoft account** (sign in with Microsoft)

### Getting to Dashboard

1. Go to [platform.openai.com](https://platform.openai.com)
2. Click **"Sign Up"** (if you don't have an account)
3. Complete the sign-up process
4. Once signed in, click on **"Dashboard"** button

---

## Step 2: Understand the Dashboard

### Dashboard Overview

Once logged in, you'll see the OpenAI Dashboard with several sections:

#### 1. **Chat/Playground**

```
Dashboard → Chat
```

This allows you to:
- Test models interactively
- Play with different prompts
- Experiment without writing code
- See real-time responses

**Quick Test Example:**
```
Input: "Hey"
Output: Model responds with "Hello! How can I help you today?"
```

#### 2. **Usage Monitoring**

```
Dashboard → Usage
```

Track your usage:
- Total tokens used
- Input tokens (what you send)
- Output tokens (what model generates)
- Cost breakdown
- Monthly spending

**Example:**
```
Input Tokens: 1,234,567
Output Tokens: 456,789
Approximate Cost: $2.34
```

#### 3. **API Keys**

```
Dashboard → API Keys
```

This is where you create and manage API keys for your projects.

#### 4. **Settings & Billing**

```
Dashboard → Settings → Billing
```

Manage your account credits and payment method.

---

## Step 3: Add Credits/Billing

### Important: OpenAI is NOT Free

OpenAI's API is a **paid service**. You must add credits to your account before using the API.

### Minimum Credit Requirement

- **Minimum**: $5 USD (one-time or monthly)
- **Cost**: Very reasonable for development
- **Estimate**: $5 is sufficient for this entire course with experimentation

### Add Credits Step-by-Step

#### 1. Go to Billing Settings

```
Dashboard → Settings → Billing & usage limits
```

#### 2. Check Current Balance

```
You'll see your available credits:
Example: $4.21 available
```

#### 3. Click "Add to Credit Balance"

```
Dashboard → Settings → Billing → [Add credits button]
```

#### 4. Set Amount

```
Minimum: $5
You can add more: $10, $20, $100, etc.
```

#### 5. Add Payment Method

```
1. Click "Add payment method"
2. Enter credit/debit card details
3. Complete billing address
4. Submit payment
```

#### 6. Confirm Credit Added

```
After successful payment:
Your credit balance updates immediately
Example: You now have $5.00 available
```

### Cost Efficiency

**How Much Will You Spend?**

```
GPT-4o: ~$0.005 per 1K input tokens
        ~$0.015 per 1K output tokens

Example:
- Testing: $0.01 per API call
- Small project: $0.10 - $1.00
- This entire course: Well under $5

You still have credit left after the course!
```

---

## Step 4: Create API Keys

### Navigate to API Keys Section

```
Dashboard → API keys
```

### View Existing Keys

You may see existing API keys. You can:
- View (partially masked for security)
- Revoke (disable immediately)
- Delete (permanent removal)

**Important**: Never share API keys publicly!

### Create a New API Key

#### Step 1: Click "Create new secret key"

```
API Keys page → [Create new secret key button]
```

#### Step 2: Name Your Key (Optional)

```
Name: "Test API Key" (or any descriptive name)
Examples:
  - "Python Project"
  - "Chatbot Application"
  - "Development Key"
  - "Production Key"
```

#### Step 3: Create the Key

```
Click "Create secret key"
↓
System generates a new API key
Example: sk-proj-abc123def456...
```

#### Step 4: Copy and Save Key

```
⚠️ IMPORTANT: Copy the key immediately!
It only shows ONCE. You cannot view it again.

Format: sk-proj-[very-long-random-string]

Store in:
  ✅ Environment variable
  ✅ .env file
  ❌ Never hardcode in public code
  ❌ Never commit to GitHub
```

---

## Step 5: Use API Key in Your Project

### Option 1: Environment Variable (Recommended)

#### On macOS/Linux:

```bash
export OPENAI_API_KEY="sk-proj-your-actual-key-here"
```

#### On Windows (PowerShell):

```powershell
$env:OPENAI_API_KEY="sk-proj-your-actual-key-here"
```

#### Permanent (Add to ~/.bashrc or ~/.zshrc):

```bash
echo 'export OPENAI_API_KEY="sk-proj-your-actual-key-here"' >> ~/.bashrc
source ~/.bashrc
```

### Option 2: .env File (Best for Development)

#### 1. Create .env file in project root:

```bash
touch .env
```

#### 2. Add your API key:

```
# .env file
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

#### 3. Install python-dotenv:

```bash
pip install python-dotenv
```

#### 4. Load in Python:

```python
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
```

### Option 3: Direct in Python (NOT Recommended)

```python
import os
os.environ["OPENAI_API_KEY"] = "sk-proj-your-actual-key-here"
```

**⚠️ Security Risk**: Never hardcode keys in production code!

---

## Step 6: Install OpenAI Python Package

### Install via pip:

```bash
pip install openai
```

### Verify Installation:

```bash
pip list | grep openai
# Should show: openai X.Y.Z
```

---

## Step 7: Test Your Setup

### Simple Test Script

```python
from openai import OpenAI
import os

# Initialize client (automatically reads OPENAI_API_KEY)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Make a test API call
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "user", "content": "Hello! How are you?"}
    ]
)

# Print response
print(response.choices[0].message.content)
```

### Expected Output:

```
Hello! I'm doing well, thank you for asking. How can I assist you today?
```

---

## Key Takeaways

- Visit **platform.openai.com** to create an account
- Add minimum **$5 USD** credits before using the API
- Create an API key: copy it immediately — it's shown **only once**
- Store key in `.env` file as `OPENAI_API_KEY=sk-proj-...`; never hardcode in source code
- Install: `pip install openai python-dotenv`
- If you accidentally expose a key, revoke it immediately from the dashboard

## Next Steps

Now that your OpenAI account is set up, you can:

1. **Test the API** with basic Python calls
2. **Explore Models** - Try different models
3. **Build Projects** - Create applications using the API
4. **Optimize Costs** - Monitor and optimize your usage
5. **Scale** - Move to production when ready

---

## Useful Resources

- [OpenAI Documentation](https://platform.openai.com/docs)
- [API Reference](https://platform.openai.com/docs/api-reference)
- [Pricing](https://openai.com/pricing)
- [Status Page](https://status.openai.com)
- [Community Forum](https://community.openai.com)

---

## Key Takeaways

✅ **OpenAI API is paid** - Minimum $5 credit required  
✅ **Setup is straightforward** - Account → Billing → API Key → Code  
✅ **API Keys are powerful** - Treat them like passwords  
✅ **Costs are low for learning** - $5 is plenty for this course  
✅ **Environment variables are secure** - Use .env files  
✅ **Dashboard helps monitoring** - Check usage regularly  
✅ **Multiple model options** - Choose based on needs  

---

## Common Next Questions

**Q: Can I use the free trial?**
A: OpenAI removed free trials. You must add a paid credit.

**Q: How do I know if I'm over budget?**
A: Set spending limits in Settings → Billing. You'll be notified.

**Q: Can I use one key for multiple projects?**
A: Yes, but it's better practice to use separate keys for each project.

**Q: What if my key is leaked?**
A: Immediately revoke it in Dashboard → API keys and create a new one.

**Q: Do I need a credit card?**
A: Yes, to verify and add credits. The card is charged when you use the API.
