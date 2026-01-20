#!/bin/bash
cd /home/kavia/workspace/code-generation/professional-appointment-management-platform-201691-201700/asistente_mia_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

