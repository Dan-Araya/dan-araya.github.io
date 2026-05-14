# Dan Araya — Data Engineer

Construyendo pipelines de datos en AWS | Python · SQL · Terraform | Open to Remote  
La Serena, Chile

---

## Sobre mí

No llegué a Data Engineering por la ruta tradicional. Llegué porque tenía un problema real que resolver: informes de facturación para una empresa de residuos con 420 empleados, múltiples fuentes de datos y sin automatización. Aprendí Python para no hacerlo a mano. No paré.

Después postulé a CORFO con un proyecto de streaming, lo que me expuso a transmisión de datos en tiempo real y arquitecturas distribuidas. Desde ahí la dirección fue clara: quiero construir la infraestructura que hace posible el análisis, no el análisis en sí.

---

## Proyecto principal

### BTC Arbitrage Data Pipeline
**AWS Serverless · Medallion Architecture · IaC con Terraform**

Pipeline de Data Engineering end-to-end que analiza spreads históricos y en tiempo real entre BTC/CLP (Buda.com) y BTC/USDT (Binance).

El foco no está en el resultado financiero. Está en la calidad de la ingeniería.

**Stack**  
`Python` `AWS Lambda` `S3` `EventBridge` `Glue Data Catalog` `Athena` `CloudWatch` `SNS` `Terraform` `Parquet`

**Competencias que demuestra**

- Arquitectura medallion Bronze / Silver / Gold en S3 con particionado Hive
- Ingesta heterogénea: paginación por cursor (Buda) vs. offset temporal (Binance), con rate limits distintos
- Reconstrucción de velas OHLCV de 1 minuto desde trades raw, con flag `is_interpolated` para trazabilidad
- Forward-fill de tipo de cambio USD/CLP con manejo de gaps de calendario y flags de linaje
- Z-score rolling, señales de arbitraje y alertas SNS en tiempo real (Fase B)
- IaC completa con Terraform — infraestructura 100% reproducible sin clicks en consola
- Arquitectura 100% serverless dentro del Free Tier de AWS

**Arquitectura**

```
EventBridge (trigger)
    ↓
Lambda (ingesta + transformación)
    ↓
S3 Bronze → S3 Silver → S3 Gold
    ↓
Glue Data Catalog
    ↓
Athena (consulta analítica SQL)
    ↓
CloudWatch + SNS (monitoreo y alertas)
```

[Ver repositorio en GitHub →](https://github.com/tu-usuario/btc-arbitrage-pipeline)

---

## Experiencia

### Ejecutivo de Habilitación Digital
**IPS ChileAtiende · Jornada parcial · La Serena**  
*Abr 2024 — presente*

Asesoría en uso de plataformas gubernamentales y resolución de problemas técnicos para usuarios finales. Rol de 30 horas mensuales que permitió dedicación paralela al desarrollo en Data Engineering.

---

### Co-founder & Desarrollador
**Aspha — Proyecto CORFO Semilla Inicia (USD 20K) · Jornada parcial**  
*Nov 2024 — Nov 2025*

Proyecto seleccionado por CORFO Semilla Inicia. Plataforma P2P de cloud gaming basada en streaming de video entre equipos. Desarrollé el MVP técnico con Moonlight/Sunshine, coordiné arquitectura backend con Docker y gestioné despliegue en AWS. Completamos el programa de validación satisfactoriamente.

Exposición práctica a streaming de datos, latencia de red y arquitecturas distribuidas.

`AWS` `Docker` `React` `Streaming`

---

### Administrativo de Gestión
**Starco | Demarco · Jornada completa · La Serena**  
*Abr 2022 — Mar 2024*

Informes de facturación mensual para contratos de recolección de residuos: sobreproducción por zona, aseo en ferias libres y áreas verdes. Gestión de datos de RRHH para 420 empleados (vacaciones, finiquitos, cumplimiento normativo). Análisis de métricas operacionales y gestión de flota GPS.

Desarrollé scripts en Python para automatizar descarga de registros y procesamiento de documentos — primer contacto con programación en contexto de producción real.

`Python` `Excel` `SQL` `Análisis de datos`

---

## Stack técnico

**Lenguajes**  
Python · SQL · Bash · HCL (Terraform)

**AWS**  
Lambda · S3 · Athena · EventBridge · Glue Data Catalog · CloudWatch · SNS

**Data Engineering**  
Medallion Architecture · Parquet · Particionado Hive · ETL/ELT Pipelines · API Ingestion · Series temporales

**Infra & Tooling**  
Terraform · Git · GitHub · Docker · pytest

---

## Educación y certificaciones

**Ingeniería en Informática**  
Instituto Profesional IACC · 2024 — en curso

**Google Cybersecurity Specialization**  
Google · Oct 2025

**Introduction to Cybersecurity**  
Cisco · May 2024

---

## Contacto

Abierto a roles de Data Engineer, especialmente remoto.

- [tu@email.com](mailto:tu@email.com)
- [LinkedIn](https://linkedin.com/in/tu-perfil)
- [GitHub](https://github.com/tu-usuario)
