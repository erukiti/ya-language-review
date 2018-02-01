@ECHO OFF
IF NOT "%~f0" == "~f0" GOTO :WinNT
@"C:\Users\erukiti\_\bin\ruby.exe" "C:/Users/erukiti/_/bin/review-init" %1 %2 %3 %4 %5 %6 %7 %8 %9
GOTO :EOF
:WinNT
@"C:\Users\erukiti\_\bin\ruby.exe" "%~dpn0" %*
