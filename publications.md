---
title: "Publications"
layout: single
author_profile: true
classes: wide
---

## 📚 Peer-Reviewed Publications

<table id="publication-table" class="display responsive nowrap" style="width:100%">
    <thead>
        <tr>
            <th>Year</th>
            <th>Title & Journal</th>
            <th>Keywords</th>
            <th>Links</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>2024</td>
            <td>
                **Dual-network PNIPAm–Gelatin Hydrogels for Controlled Release**
                <br>*Journal of Advanced Biomaterials*
            </td>
            <td>Hydrogels, PNIPAm, Drug Delivery, MOF, Shape Memory</td>
            <td>
                [<i class="ai ai-google-scholar"></i> Scholar] (Link to Google Scholar)
                [<i class="fas fa-file-pdf"></i> PDF] (/assets/pdf/paper1.pdf)
            </td>
        </tr>
        <tr>
            <td>2023</td>
            <td>
                **Deep Learning for Release Kinetics Prediction**
                <br>*AI in Biomedical Engineering*
            </td>
            <td>AI, Deep Learning, Kinetics, Modeling</td>
            <td>
                [<i class="ai ai-google-scholar"></i> Scholar] (Link to Google Scholar)
            </td>
        </tr>
        </tbody>
</table>

<script>
    // Initialize DataTables after the table has loaded
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof DataTable !== 'undefined') {
            new DataTable('#publication-table', {
                paging: true,
                searching: true,
                ordering: true,
                info: true,
                order: [[0, 'desc']] // Default sort by Year (column 0) descending
            });
        }
    });
</script>
