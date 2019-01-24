PROJECT = "My Vue Project"

all: install build dev

install: ;@echo "Installing ${PROJECT}....."; \
	npm install \
	npm install -g @vue/cli

build: ;@echo "Building ${PROJECT}....."; \
	npm run build

dev: ;@echo "Starting ${PROJECT}....."; \
	npm run serve

clean : ;
	rm -rf node_modules


.PHONY: test server install clean update
