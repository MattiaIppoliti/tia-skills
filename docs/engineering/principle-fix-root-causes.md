## What it does

`principle-fix-root-causes` traces a failure to the earliest controllable condition that permits it, then prevents that condition. It distinguishes a real fix from containment that only reduces the immediate symptom.

## When to reach for it

You invoke this by typing `/principle-fix-root-causes`, and the agent won't reach for it on its own. Reach for it when a bug is recurring, a proposed patch adds a broad catch or retry, or a symptom fix feels suspiciously local.

## Cause versus containment

Containment can be the right immediate safety measure, but it must remain named as containment. The root cause has its own falsifiable statement and regression check.

## It's working if

- The team can state the failed assumption or condition in one testable sentence.
- The regression test fails when the cause returns, not only when the old symptom appears.
- Any temporary guard has a distinct reason and follow-up.

## Where it fits

`principle-fix-root-causes` is a reach-for-it-anytime debugging principle. [diagnosing-bugs](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/diagnosing-bugs.md) supplies the disciplined investigation loop; [tdd](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/tdd.md) supplies the regression behavior. [ask-mattia](https://github.com/MattiaIppoliti/tia-skills/blob/main/docs/engineering/ask-mattia.md) maps the set.
