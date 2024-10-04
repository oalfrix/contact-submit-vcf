
This is a simple web app that allows users to submit their name, phone number, and country code. The backend saves the data in a VCF file format, accessible only to the admin. The admin can download the VCF file containing all contact submissions.

- Frontend: HTML, JavaScript
- Backend: Node.js, Express.js, vcf library for VCF generation
- Admin Authentication: Basic Authentication (username: admin, password: password123)

Usage:
1. Run `npm install express body-parser vcf basic-auth` to install dependencies.
2. Start the server using `node server.js`.
3. Users can submit contacts at `http://localhost:3000`.
4. Admin can download contacts from `http://localhost:3000/admin/download-contacts`.
