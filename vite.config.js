import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		exclude: [
			'@chakra-ui/system',
			'@chakra-ui/icons',
			'axios',
			'@types/react',
			'@types/react-dom'
		]
	}
})
