# Downloads the six generated stage clips into public/videos/stages/.
# Run from the repo root:  powershell -ExecutionPolicy Bypass -File scripts\download-stage-videos.ps1
# v2: stages 2, 3 and 6 regenerated after owner review (didactic cross-sections,
#     water tumbler instead of a stemmed glass).

$dir = Join-Path $PSScriptRoot "..\public\videos\stages"
New-Item -ItemType Directory -Force -Path $dir | Out-Null

$base = "https://d8j0ntlcm91z4.cloudfront.net/user_3Hd20yJnSLeFI71moFd2RBwTdqG"
$files = @{
  "stage-1-mesh.mp4"      = "$base/hf_20260809_094022_18ee86c1-ad02-47b7-bb91-005a3660ab59.mp4"
  "stage-2-carbon.mp4"    = "$base/hf_20260809_102356_e3ecdc5c-365c-4d0f-808a-87a51b938f62.mp4"
  "stage-3-resin.mp4"     = "$base/hf_20260809_102356_9106c550-0a11-4813-a5c9-5ee4a8ed512e.mp4"
  "stage-4-membrane.mp4"  = "$base/hf_20260809_094007_f667f8d9-eccf-48e5-a210-8fd7e99c30de.mp4"
  "stage-5-magnesium.mp4" = "$base/hf_20260809_094007_cd76bfaf-b9c5-4ecf-8786-d16c8879f116.mp4"
  "stage-6-glass.mp4"     = "$base/hf_20260809_102356_bed31aa1-6bab-43d3-a10e-ad53ebd06a80.mp4"
}

foreach ($name in $files.Keys) {
  $out = Join-Path $dir $name
  Write-Host "Downloading $name ..."
  Invoke-WebRequest -Uri $files[$name] -OutFile $out
}

Write-Host "Done:" (Get-ChildItem $dir | Measure-Object Length -Sum).Sum "bytes total"
