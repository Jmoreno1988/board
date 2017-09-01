@echo off
set i=0
for %%f in (*.jpg) do call :renameit "%%f"
goto done

:renameit
ren %1 %i%.jpg
set /A i+=1

:done