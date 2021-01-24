ng build --prod
scp -P 10022 -r dist/energy/* dockeruser@194.5.179.45:/usr/share/nginx/test



