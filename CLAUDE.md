# Claude instructions (project override)

- Always prioritize generating unified diff patches over rewriting whole files.
- Output highly concise code modifications—do not include conversational fluff.
- Strictly respect workspace boundaries: do not touch node_modules, build outputs, or .git files.
- Remind the user to run `/compact` or `/clear` when moving between different files or tasks to save token consumption.
