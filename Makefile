run:
	@clear
	@echo "Copiling..."
	tsc solver.ts
	@echo "Running..."
	node solver.js

compile:
	@clear
	@echo "Compiling..."
	tsc solver.ts

