exclude-folders
===============

Brackets extension for excluding folders from the file tree, find in files, and quick open.

To install:

1. Launch Brackets
2. Open Extension Manager by click on the Lego icon in the right toolbar
3. Click the "Install from URL..." button
4. Paste (or enter) `https://github.com/aiobz/exclude-folders` and click "Install"

To config:

```
open brackets preferences `command + ,` and then
```

This exclude node_modules and bower_components by default.
```
add "exclude.regex": "^(node_modules|bower_components)$" for exclude the folder or file.
```

Default is "".
```
add "exclude.modifier": "" for modifiers eg. i for case sensitive
```

after you change config in brackets.json the file tree will be automatic refresh.

***This extension extended from 'https://github.com/gruehle/exclude-folders'
credit:: https://github.com/gruehle/exclude-folders
