# Job Sequencing with Deadlines (Greedy Algorithm)

A web app that solves the job sequencing problem using the greedy approach.

## How it works
1. Sort all jobs by profit (highest first)
2. For each job, place it in the latest free slot on or before its deadline
3. If no slot is free, the job is rejected
4. Total profit = sum of the profits of the scheduled jobs

## Complexity
- Time: O(n log n) for sorting + O(n * d) for slot search
- Space: O(d), where d = maximum deadline

## Tech
HTML, CSS, JavaScript. Deployed on Vercel.

## Run locally
Open `index.html` in a browser.
