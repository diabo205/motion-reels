# Thin PowerShell wrapper delegating to the cross-platform Node pipeline (scripts/pipeline.js)
$ErrorActionPreference = "Stop"
$env:PATH = "C:\Users\Syed Obaid\AppData\Local\Microsoft\WinGet\Links;$env:PATH"

node scripts/pipeline.js @args
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}
