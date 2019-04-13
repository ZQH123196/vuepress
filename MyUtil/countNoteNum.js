// sudo find . -name note.md | wc -l
const { exec } = require('child_process');
exec("sudo find . -name note.md | wc -l", (err, stdout, stderr) => {
	console.log("note.md 的数量为 :" + stdout)
	if (stderr) console.log("stderr:" + stderr)
})	